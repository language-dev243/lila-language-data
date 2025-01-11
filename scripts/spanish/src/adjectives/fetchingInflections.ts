import axios from "axios";
import * as cheerio from 'cheerio';
import chalk from "chalk";

export async function fetchingInflections(adjective: Adjective, sourceFilePath: FilePath) {

  console.log("💡 fetching inflections...")

  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
    adjective.singular_masculine)}`

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const inflectionTable = $(".inflection-table");

    if (inflectionTable.length > 0) {
      adjective.plural_masculine = inflectionTable.find("tr:nth-child(2) td:nth-child(3)").text().trim()
      adjective.singular_feminine = inflectionTable.find("tr:nth-child(3) td:nth-child(2)").text().trim()
      adjective.plural_feminine = inflectionTable.find("tr:nth-child(3) td:nth-child(3)").text().trim()
      console.log(`${chalk.green("✅ inflections found")}`)
      return
    } else {
      return false
    }

  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    return
  }
}