import axios from "axios";
import * as cheerio from "cheerio";
import chalk from "chalk";

import {writingToCSV} from "../utils/writingToCSV";
import {deletingFromCSV} from "../utils/deletingFromCSV";

export async function fetchingTranslationsEnglish(word, sourceFilePath) {
  console.log("💡 english");

  try {
    const url = `https://enes.dict.cc/?s=${word.singular_masculine}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scriptContent = $('script:contains("var nres=")').text();

    const spanishWords = scriptContent.match(
      /var c1Arr = new Array\((.*?)\);/,
    )[1];
    const englishWords = scriptContent.match(
      /var c2Arr = new Array\((.*?)\);/,
    )[1];

    const regex = /"(.*?)"/g;

    const spanishWordsArray = spanishWords
      .match(regex)
      .map((match) => match.slice(1, -1))
      .slice(1);
    const englishWordsArray = englishWords
      .match(regex)
      .map((match) => match.slice(1, -1))
      .slice(1);

    spanishWordsArray.forEach((spanishWord, index) => {
      if (spanishWord === word.singular_masculine) {
        word.english_translations.push(englishWordsArray[index]);
      }
    });

    console.log(`${chalk.green("✅ english translations found")}`);
  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`);
    await writingToCSV(
      word.singular_masculine,
      "./data/processed/withError/translationsEN.csv",
    );
    await deletingFromCSV(word.singular_masculine, sourceFilePath);
    return;
  }
}
