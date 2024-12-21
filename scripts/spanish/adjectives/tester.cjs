/*

export interface SpanishAdjective {
  id: string;
  created_at: Date;

  [x] adjective_singular_masculine: string;
  [x] adjective_singular_feminine: string;
  [x] adjective_plural_masculine: string;
  [x] adjective_plural_feminine: string;

  [x] ipa_singular_masculine: string;
  ipa_singular_feminine: string;
  ipa_plural_masculine: string;
  ipa_plural_feminine: string;

  [x] syllabification_singular_masculine: string;
  syllabification_singular_feminine: string;
  syllabification_plural_masculine: string;
  syllabification_plural_feminine: string;

  not needed right now - audio_links_plural_feminine: string[];
  not needed right now - audio_links_plural_masculine: string[];
  not needed right now - audio_links_singular_feminine: string[];
  not needed right now - audio_links_singular_masculine: string[];

  difficulty: "easy" | "middle" | "hard";
  [x] english_translations: string[];
  not needed right now - french_translations: string[];
  not needed right now - italian_translations: string[];
  not needed right now - german_translations: string[];
}

steps:

[x] read words from csv file
[x] check if words exist on wiktionary
[x] getting english translations
[x] getting ipa from wiktionary
[x] getting syllabification from wiktionary
[x] getting inflections for masculine singular
[ ] setting difficulty to "easy"


*/

const fs = require("fs/promises");
const Papa = require("papaparse");
const https = require("https");
const cheerio = require("cheerio");
const readline = require("readline");
const axios = require("axios");

async function parseCSV() {
  const dataPath = "./datafiles/test.csv";
  const csvData = await fs.readFile(dataPath, "utf8");

  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  const adjectives = parsed.data.map((row) => ({
    adjective_singular_masculine: row.word,
    english_translations: [
      row.english_translations,
      row.english_translations2,
      row.english_translations3,
      row.english_translations4,
      row.english_translations5,
      row.english_translations6,
    ].filter(Boolean),
  }));

  return adjectives;
}

function askToContinue() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "Do you want to continue with the next step? (Y/n) ",
      (answer) => {
        rl.close();
        resolve(answer.trim().toLowerCase() === "y" || answer.trim() === "");
      }
    );
  });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function checkWiktionary(words, wordsInWiktionary, wordsNotInWiktionary) {
  for (const word of words) {
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word.word_singular_masculine
    )}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        wordsInWiktionary.push(word);
      } else {
        wordsNotInWiktionary.push(word);
      }
    } catch (err) {
      console.error(
        `Error checking Wiktionary for ${word.word_singular_masculine}:`,
        err
      );
      wordsNotInWiktionary.push(word);
    }

    await delay(100);
  }
}

async function writeWordsNotInWiktionary(wordsNotInWiktionary) {
  const csvData = wordsNotInWiktionary
    .map((word) => `${word.word_singular_masculine}`)
    .join("\n");
  const filePath = "./datafiles/wordsNotInWiktionary.csv";

  try {
    await fs.promises.appendFile(filePath, csvData);
  } catch (error) {
    console.error("Error writing to CSV:", error);
  }
}

async function resetArrays(words, wordsInWiktionary, wordsNotInWiktionary) {
  words = words.map((word) => ({ word_singular_masculine: word }));
  wordsInWiktionary.length = 0;
  wordsNotInWiktionary.length = 0;
}

async function gettingIPA(words, wordsWithoutIPA) {
  for (const word of words) {
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word.word_singular_masculine
    )}`;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Log the pronunciation table for inspection
      const pronunciationTable = $(".pron-graf").html();
      console.log(`Pronunciation Table for ${word.adjective_singular_masculine}:\n`, pronunciationTable);

      // Try to locate the pronunciation <td> specifically labeled "AFI" and fetch the next <td>
      const ipa = $("td:contains('pronunciación')")
        .nextAll("td") // Look at the following <td> elements to find IPA
        .first()        // Ensure we're only selecting the first match
        .text()
        .trim();

      console.log(ipa);

      const closingBracketIndex = ipa.indexOf("]");
      if (closingBracketIndex !== -1) {
        const cleanedIpa = ipa.slice(0, closingBracketIndex + 1);
        word.ipa = cleanedIpa;
      } else {
        wordsWithoutIPA.push(word.word_singular_masculine);
      }
    } catch (error) {
      console.error(
        `Error fetching IPA for ${word.word_singular_masculine}:`,
        error
      );
    }

    await delay(100);
  }
}

async function gettingSyllabification(words, wordsWithoutSyllabification) {
  for (const word of words) {
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word.word_singular_masculine
    )}`;
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const syllabification = $("tr")
        .filter((i, el) =>
          $(el).find("td").first().text().includes("silabación")
        )
        .find("td")
        .last()
        .text()
        .trim();

      const cleanedSyllabification = syllabification
        .replace(/\[\d+\]$/, "")
        .trim();

      if (cleanedSyllabification) {
        word.syllabification = cleanedSyllabification;
      } else {
        wordsWithoutSyllabification.push(word.word_singular_masculine);
      }
    } catch (error) {
      console.error(
        `Error fetching IPA for ${word.word_singular_masculine}:`,
        error
      );
    }

    await delay(100);
  }
}

async function gettingInflections(words, wordsWithoutInflections) {
  for (const word of words) {
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word.word_singular_masculine
    )}`;
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const inflectionTable = $(".inflection-table");

      if (inflectionTable.length > 0) {
        const pluralMasculine = inflectionTable
          .find("tr:nth-child(2) td:nth-child(3)")
          .text()
          .trim();
        const singularFeminine = inflectionTable
          .find("tr:nth-child(3) td:nth-child(2)")
          .text()
          .trim();
        const pluralFeminine = inflectionTable
          .find("tr:nth-child(3) td:nth-child(3)")
          .text()
          .trim();
        word.word_plural_masculine = pluralMasculine;
        word.word_singular_feminine = singularFeminine;
        word.word_plural_feminine = pluralFeminine;
      } else {
        wordsWithoutInflections.push(word.word_singular_masculine);
      }
    } catch (error) {
      console.error(
        `Error fetching IPA for ${word.word_singular_masculine}:`,
        error
      );
    }

    await delay(100);
  }
}

function settingDifficulty(words) {
  for (const word of words) {
    word.difficulty = "easy";
  }
}

async function main() {
  const wordsInWiktionary = [];
  const wordsNotInWiktionary = [];
  const wordsWithoutIPA = [];
  const wordsWithoutSyllabification = [];
  const wordsWithoutInflections = [];

  let words = [];

  try {
    // step 1: reading csv file
    console.log("✅ step 1/10 parsing source file:");
    words = await parseCSV();
    console.log(`✅ ${words.length} words parsed.\n`);

    await delay(2000);

    // step 2: checking wiktionary
    console.log("✅ step 2/10 checking for words in wiktionary:");
    await checkWiktionary(words, wordsInWiktionary, wordsNotInWiktionary);
    console.log(
      `✅ i have found ${wordsInWiktionary.length} of the ${words.length} words on wiktionary.\n`
    );
    await delay(2000);

    // step 2.5: writing to csv, resetting data
    if (wordsNotInWiktionary.length > 0) {
      await writeWordsNotInWiktionary(wordsNotInWiktionary);
      console.log(
        `✅ ${wordsNotInWiktionary.length} words written to wordsNotInWiktionary.csv\n`
      );
    }
    resetArrays(words, wordsInWiktionary, wordsNotInWiktionary);

    // step 3: getting ipa from wiktionary
    console.log("✅ step 3/10 fetching ipa from wiktionary.\n");
    await gettingIPA(words, wordsWithoutIPA);

    // step 4: getting syllabification from wiktionary
    //console.log("✅ step 4/10 fetching syllabification from wiktionary.\n");
    //await gettingSyllabification(words, wordsWithoutSyllabification);

    // step 5: getting inflections from wiktionary
    //console.log("✅ step 5/10 fetching inflections from wiktionary.\n");
    //await gettingInflections(words, wordsWithoutInflections);

    // step 6: setting difficulty to "easy"
    //console.log("✅ step 6/10 setting difficulty to easy.\n");
    //settingDifficulty(words);

    console.log("words currently looks like this: \n");
    console.log(words);
  } catch (error) {
    console.error("An error occurred:", error);
  }
  process.exit(0);
}

main();
