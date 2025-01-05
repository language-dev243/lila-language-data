import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingInflections(word) {

  // console.log("💡 step 3: fetching inflections...")

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
      // console.log("✅ inflections found \n")
    } else {
      c// onsole.log("❌ no inflections found")
      return
    }


  } catch (error) {
    console.error("Unexpected error:", error.message);
    return
  }
}