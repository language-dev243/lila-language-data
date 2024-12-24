import axios from "axios";
import cheerio from "cheerio";

export async function fetchingInflections(word) {
  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word)}`

      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const inflectionTable = $(".inflection-table");

       
          if (inflectionTable.length > 0) {
             word.pluralMasculine = inflectionTable
              .find("tr:nth-child(2) td:nth-child(3)")
              .text()
              .trim();
            
            } else {
              console.log("no inflections found")
            }


      } catch (error) {
        console.error("Unexpected error:", error.message);
      }
      console.log("word now looks like this: ", word)
}