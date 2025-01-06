import axios from "axios";
import * as cheerio from 'cheerio';
import chalk from "chalk";

import { writingToCSV } from "../writingToCSV";
import { deletingFromCSV } from "../deletingFromCSV";

export async function fetchingIPA(word, sourceFilePath) {

  console.log("💡 fetching IPA...")

  try {

    const inflections = ["singular_masculine", "plural_masculine", "singular_feminine", "plural_feminine"]

    for (const inflection of inflections) {

      const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
        word[inflection]
      )}`;

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const dataTable = $(".pron-graf");

      if (dataTable.length > 0) {
        let ipa = dataTable.find("tr:nth-child(2) td:nth-child(2)").text().trim();
        ipa = ipa.replace(/].*$/, "]").trim();
        ipa = ipa.replace(/[\[\]]/g, "").trim();

        word[`ipa_${inflection}`] = ipa;

      } else {
        console.log(`${chalk.red("❌ no IPA found for ", inflection)}`);
        return
      }
    }

    console.log(`${chalk.green("✅ IPA found")}`);


  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    await writingToCSV(word.singular_masculine, "./data/processed/withError/ipa.csv")
    await deletingFromCSV(word.singular_masculine, sourceFilePath)
    return
  }
}