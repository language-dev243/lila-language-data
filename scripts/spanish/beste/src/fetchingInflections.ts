import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingInflections(word) {

  console.log("💡 step 3: fetching inflections...")

  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word)}`

      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const inflectionTable = $(".inflection-table");
        console.log("inflection table: ", inflectionTable)

       
          if (inflectionTable.length > 0) {
             word.plural_masculine = inflectionTable
              .find("tr:nth-child(2) td:nth-child(3)")
              .text()
              .trim();      
            } else {
              console.log("no inflections found")
            }


      } catch (error) {
        console.error("Unexpected error:", error.message);
      }
}