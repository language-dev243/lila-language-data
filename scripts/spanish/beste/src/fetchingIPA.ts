import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingIPA(word) {

  console.log("💡 step 4: fetching IPA...")

      try {
        const urlSingularMasculine = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word.singular_masculine)}`
        
        const response = await axios.get(urlSingularMasculine);
        const $ = cheerio.load(response.data);

        const dataTable = $(".pron-graf");
       
          if (dataTable.length > 0) {
             word.ipa_singular_masculine = dataTable.find("tr:nth-child(2) td:nth-child(2)").text().trim();
            // Remove everything after the closing square bracket "]"
             word.ipa_singular_masculine = word.ipa_singular_masculine.replace(/].*$/, "]").trim();
            // Remove the square brackets
            word.ipa_singular_masculine = word.ipa_singular_masculine.replace(/[\[\]]/g, "").trim();

             console.log("✅ IPA found: ", word.ipa_singular_masculine)
            } else {
              console.log("❌ no IPA found")
              return
            }
          
      } catch (error) {
        console.error("Unexpected error:", error.message);
        return
      }
}