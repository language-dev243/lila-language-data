const fs = require("fs/promises");
const Papa = require("papaparse");
const https = require("https");
const cheerio = require("cheerio");

// example line:
// abandonado,abandoned

// steps:
// 1. read data from source file
// 2. check if is word on wikitionary, ie check if article exists, https://es.m.wiktionary.org/wiki/abandonado
// 3. get ipa, syllabification from the article
// 4. get links to singular feminino, plural masculino, plural femenino
// 5. get their ipa and syllabification from their articles (siehe step 4)
// 6. set the links to the audio files to an empty string ""
// 7. get the english translations from the source files and fill it in
// 8. get the french translations
// 9. get the italian translations
// 10. get the german translations
// 11. upload the csv to the supabase database

async function parseCSV() {
  const dataPath = "./datafiles/test.csv";
  const csvData = await fs.readFile(dataPath, "utf8");
  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  const words = parsed.data.map((row) => ({
    word_singular_masculine: row.word,
    english_translations: row.english_translations,
  }));
  return words;
}

async function checkWiktionary(word) {
  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(word)}`;

  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on("error", (err) => {
        console.error(`Error checking Wiktionary for ${word}:`, err);
        resolve(false);
      });
  });
}

async function getAttributes(word) {
  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(word)}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const $ = cheerio.load(data);

            const wordObject = {
              word_singular_masculine: word,
              ipa_singular_masculine: "",
              syllabification_singular_masculine: "",
              audio_links_singular_masculine: "",

              word_singular_feminine: "",
              ipa_singular_feminine: "",
              syllabification_singular_feminine: "",
              audio_links_singular_feminine: "",

              word_plural_masculine: "",
              ipa_plural_masculine: "",
              syllabification_plural_masculine: "",
              audio_links_plural_masculine: "",

              word_plural_feminine: "",
              ipa_plural_feminine: "",
              syllabification_plural_feminine: "",
              audio_links_plural_feminine: "",

              english_translations: "",
              french_translations: "",
              italian_translations: "",
              german_translations: "",
            };

            // Extract inflection table data
            const table = $(".inflection-table");
            table.find("tr").each((i, row) => {
              const cells = $(row).find("td");

              if (cells.length === 0) return;
              const rowHeader = $(row).find("th").last().text().trim();
              const isMasculine = rowHeader.includes("Masculino");
              const singular = cells.eq(0).text().trim();
              const plural = cells.eq(1).text().trim();

              if (isMasculine) {
                wordObject.word_singular_masculine = singular;
                wordObject.word_plural_masculine = plural;
              } else {
                wordObject.word_singular_feminine = singular;
                wordObject.word_plural_feminine = plural;
              }
            });

            // Extract IPA and syllabification
            $("span.IPA, span.sill").each((i, elem) => {
              const text = $(elem).text().trim();
              if ($(elem).hasClass("IPA")) {
                if (!wordObject.ipa_singular_masculine) {
                  wordObject.ipa_singular_masculine = text;
                }
              } else if ($(elem).hasClass("sill")) {
                if (!wordObject.syllabification_singular_masculine) {
                  wordObject.syllabification_singular_masculine = text;
                }
              }
            });

            // Improved translation extraction
            const translations = {};
            $("div[id^='Traducciones-']").each((i, section) => {
              const lang = $(section).attr("id").split("-")[1];
              const words = [];
              $(section)
                .find("li")
                .each((i, item) => {
                  words.push($(item).text().trim());
                });
              translations[lang] = words.join(", ");
            });

            wordObject.english_translations = translations.inglés || "";
            wordObject.french_translations = translations.francés || "";
            wordObject.italian_translations = translations.italiano || "";
            wordObject.german_translations = translations.alemán || "";

            console.log("Extracted word forms:", {
              singular_masculine: wordObject.word_singular_masculine,
              plural_masculine: wordObject.word_plural_masculine,
              singular_feminine: wordObject.word_singular_feminine,
              plural_feminine: wordObject.word_plural_feminine,
            });

            resolve(wordObject);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function setEmptyAudioLinks(wordObject) {
  const audioFields = [
    "audio_links_singular_masculine",
    "audio_links_singular_feminine",
    "audio_links_plural_masculine",
    "audio_links_plural_feminine",
  ];

  audioFields.forEach((field) => {
    wordObject[field] = "";
  });

  return wordObject;
}

async function writeToCSV(wordObjects) {
  const csvContent = Papa.unparse(wordObjects, {
    header: true,
  });

  await fs.writeFile("./datafiles/processed_words.csv", csvContent);
  return csvContent;
}

async function verifyCsv() {
  try {
    const csvData = await fs.readFile(
      "./datafiles/processed_words.csv",
      "utf8"
    );
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    // Check first row as example
    const firstRow = parsed.data[0];
    console.log("\n=== CSV Verification ===");
    console.log("Number of processed words:", parsed.data.length);
    console.log("\nFirst word data:");
    console.log("Masculine forms:");
    console.log("- Singular:", firstRow.word_singular_masculine);
    console.log("- IPA:", firstRow.ipa_singular_masculine);
    console.log("- Syllables:", firstRow.syllabification_singular_masculine);

    console.log("\nFeminine forms:");
    console.log("- Singular:", firstRow.word_singular_feminine);
    console.log("- Plural:", firstRow.word_plural_feminine);

    console.log("\nTranslations:");
    console.log("- English:", firstRow.english_translations);
    console.log("- French:", firstRow.french_translations);
    console.log("- Italian:", firstRow.italian_translations);
    console.log("- German:", firstRow.german_translations);

    return parsed.data;
  } catch (error) {
    console.error("Error verifying CSV:", error);
    return null;
  }
}

async function uploadToSupabase() {
  // upload the content of the csv to supabase
}

async function main() {
  try {
    const words = await parseCSV();
    console.log("✅ step 1/10 parsing source file...");
    console.log(words)
/*
    const processedWords = [];
    const wordsNotInWiktionary = [];

    for (const word of words) {
      const exists = await checkWiktionary(word.word_singular_masculine);

      if (exists) {
        console.log(`✅ step 2/10 checking if word exists on Wiktionary...`);

        try {
          let wordObject = await getAttributes(word.word_singular_masculine);
          wordObject = await setEmptyAudioLinks(wordObject);

          // Preserve source translations if Wiktionary translations are empty
          if (!wordObject.english_translations && word.english_translations) {
            wordObject.english_translations = word.english_translations;
          }

          processedWords.push(wordObject);
        } catch (error) {
          console.error(
            `Error processing ${word.word_singular_masculine}:`,
            error
          );
          wordsNotInWiktionary.push(word);
        }
      } else {
        console.log(
          `❌ ${word.word_singular_masculine} does not exist on Wiktionary.`
        );
        wordsNotInWiktionary.push(word);
      }
    }
*/
    // ... rest of the main function remains the same
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();

/* 

attributes of spanish adjectives:
- word_singular_masculine
- ipa_singular_masculine
- syllabification_singular_masculine
- link_to_audio_file_singular_masculine

- word_singular_feminine
- ipa_singular_feminine
- syllabification_singular_feminine
- link_to_audio_file_singular_feminine

- word_plural_masuline
- ipa_plural_masculine
- syllabification_plural_masuline
- link_to_audio_file_plural_masuline

- word_plural_feminine
- ipa_plural_feminine
- syllabification_plural_feminine
- link_to_audio_file_plural_feminine

- english_translations
- french_translations
- italian_translations
- german_translations


header of the source csv file:
word,english_translations

example data of source csv file:
abstracto,abstract
absurdo,absurd
abundante,abundant,plentiful
aburrido,boring,bored
académico,academic
amable,kind,nice,friendly
amargo,bitter,sour,painful
amarillento,yellowish
bastante,rather,fairly,quite a bit (ADV)
celeste,heavenly,sky-blue
cuanto,en c. a: in terms of,regarding

header of the target csv file:
word_singular_masculine,ipa_singular_masculine,syllabification_singular_masculine,link_to_audio_file_singular_masculine,word_singular_feminine,ipa_singular_feminine,syllabification_singular_feminine,link_to_audio_file_singular_feminine,word_plural_masculine,ipa_plural_masculine,syllabification_plural_masculine,link_to_audio_file_plural_masculine,word_plural_feminine,ipa_plural_feminine,syllabification_plural_feminine,link_to_audio_file_plural_feminine,english_translations,french_translations,italian_translations,german_translations

*/
