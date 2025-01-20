import axios from "axios";
import * as cheerio from "cheerio";
import chalk from "chalk";

import {writingToCSV} from "../utils/writingToCSV";
import {deletingFromCSV} from "../utils/deletingFromCSV";

export async function fetchingTranslationsItalian(word, sourceFilePath) {
  console.log("💡 italian");

  try {
    const url = `https://www.wordreference.com/esit/${word.singular_masculine}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let translation = $(".tran").first().text().trim();
    word.italian_translations.push(translation.replace(/\(.*?\)/g, "").trim());

    console.log(`${chalk.green("✅ italian translations found")}`);
  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`);
    await writingToCSV(
      word.singular_masculine,
      "./data/processed/withError/translationsIT.csv",
    );
    await deletingFromCSV(word.singular_masculine, sourceFilePath);
    return;
  }
}
