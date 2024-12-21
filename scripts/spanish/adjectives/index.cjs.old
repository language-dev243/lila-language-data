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
              link_to_audio_file_singular_masculine: "",

              word_singular_feminine: "",
              ipa_singular_feminine: "",
              syllabification_singular_feminine: "",
              link_to_audio_file_singular_feminine: "",

              word_plural_masculine: "",
              ipa_plural_masculine: "",
              syllabification_plural_masculine: "",
              link_to_audio_file_plural_masculine: "",

              word_plural_feminine: "",
              ipa_plural_feminine: "",
              syllabification_plural_feminine: "",
              link_to_audio_file_plural_feminine: "",

              english_translations: "",
              french_translations: "",
              italian_translations: "",
              german_translations: "", 
            };

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
  // return the wordObject with empty audio links
}

async function addEnglishTranslations(wordObject) {
  // return the wordObject with the English translations
}

async function addFrenchTranslations(wordObject) {
  // return the wordObject with the french translations
}

async function addItalianTranslations(wordObject) {
  // return the wordObject with the italian translations
}

async function addGermanTranslations(wordObject) {
  // return the wordObject with the german translations
}

async function writeToCSV(wordObject) {
  // write the wordObject to the csv file
}

async function uploadToSupabase() {
  // upload the content of the csv to supabase
}

async function main() {
  try {
    // step 1
    const words = await parseCSV();
    console.log("✅ step 1/10 parsing source  file...");
    // step 2
    const wordsNotInWiktionary = [];
    for (const word of words) {
      const exists = await checkWiktionary(word.word_singular_masculine);
      if (exists) {
        console.log(`✅ step 2/10 checking if word exists on Wiktionary...`);

        // step 3
        try {
          const attributes = await getAttributes(word.word_singular_masculine);
          console.log("Full word object:", attributes);
        } catch (error) {
          console.error(
            `Error getting attributes for ${word.word_singular_masculine}:`,
            error
          );
        }

      } else {
        console.log(
          `❌ ${word.word_singular_masculine} does not exist on Wiktionary.`
        );
        wordsNotInWiktionary.push(word);
      }
    }

    if (wordsNotInWiktionary.length > 0) {
      const csvContent = Papa.unparse(wordsNotInWiktionary);
      await fs.writeFile("./datafiles/wordsNotInWiktionary.csv", csvContent);
      console.log(
        `🚫 Saved ${wordsNotInWiktionary.length} words to wordsNotInWiktionary.csv`
      );
    }

    // const wordObject = getAttributes()
    // console.log("✅ step 3/10 downloading word attributes...")
    // setEmptyAudioLinks(wordObject)
    // console.log("✅ step 4/10 setting pty audio links...")
    // addEnglishTranslations(wordObject)
    // console.log("✅ step 5/10 adding English translations...")
    // addFrenchTranslations(wordObject)
    // console.log("✅ step 6/10 adding French translations...")
    // addItalianranslations(wordObject)
    // console.log("✅ step 7/10 adding Italian translations...")
    // addGermanTranslations(wordObject)
    // console.log("✅ step 8/10 adding German translations...")
    // writeToCSV(wordObject)
    // console.log("✅ step 9/10 writing wordObject to CSV...")
    // uploadToSupabase()
    // console.log("✅ step 10/10 uploading to supabase...")
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
