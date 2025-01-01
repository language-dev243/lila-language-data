import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingTranslations(word) {

    console.log("💡 step 6: fetching translations...")

    try {
        const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(word.singular_masculine)}`;

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const translationTable = $(".trad-arriba");

        if (translationTable.length > 0) {
            console.log("translation table: ", translationTable, "\n")

            console.log("✅ translations found \n");
        } else {
            console.log("❌ no translations found");
        }

    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}