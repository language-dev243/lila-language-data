import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingSyllabifications(word) {

    console.log("💡 step 5: fetching syllabifications...")

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
                let syllabification = dataTable
                    .find("tr:contains('silabación') td:nth-child(2)")
                    .text()
                    .trim();

                syllabification = syllabification.replace(/\[\d+\]/g, "").trim();


                if (syllabification) {
                    word[`syllabification_${inflection}`] = syllabification;
                    word[`syllable_count_${inflection}`] = syllabification.split('-').length;
                }
            } else {
                console.log(`❌ no syllabification found for ${inflection}`);
                return
            }
        }
        console.log("✅ syllabifications found \n");

    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}