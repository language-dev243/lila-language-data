import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingTranslationsItalian(word) {

    // console.log("💡 fetching italian translations...")

    try {
        const url = `https://www.wordreference.com/esit/${word.singular_masculine}`
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let translation = $('.tran').first().text().trim();
        word.italian_translations.push(translation.replace(/\(.*?\)/g, '').trim())

        // console.log("✅ italian translations found \n");
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}
