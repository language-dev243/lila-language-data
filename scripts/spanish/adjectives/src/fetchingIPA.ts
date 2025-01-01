import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingIPA(word) {

  console.log("💡 step 4: fetching IPA...")

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
        // Remove everything after the closing square bracket "]"
        ipa = ipa.replace(/].*$/, "]").trim();
        // Remove the square brackets
        ipa = ipa.replace(/[\[\]]/g, "").trim();

        word[`ipa_${inflection}`] = ipa;

      } else {
        console.log(`❌ no IPA found for ${inflection}`);
        return
      }
    }
    console.log("✅ IPA found \n");

  } catch (error) {
    console.error("Unexpected error:", error.message);
    return
  }
}