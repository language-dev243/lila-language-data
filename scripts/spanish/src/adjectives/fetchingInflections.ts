import axios from "axios";
import * as cheerio from 'cheerio';
import chalk from "chalk";

export async function fetchingInflections(word) {

  console.log("💡 fetching inflections...")

  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
    word.singular_masculine)}`

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const inflectionTable = $(".inflection-table");

    if (inflectionTable.length > 0) {
      word.plural_masculine = inflectionTable.find("tr:nth-child(2) td:nth-child(3)").text().trim()
      word.singular_feminine = inflectionTable.find("tr:nth-child(3) td:nth-child(2)").text().trim()
      word.plural_feminine = inflectionTable.find("tr:nth-child(3) td:nth-child(3)").text().trim()
      console.log(`${chalk.green("✅ inflections found")}`)
    } else {
      console.log(`${chalk.red("❌ no inflections found")} \n`)
      return
    }


  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    return
  }
}