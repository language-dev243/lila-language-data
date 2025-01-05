import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingTranslationsFrench(word) {

    // console.log("💡 fetching french translations...")

    try {
        const url = `https://www.wordreference.com/esfr/${word.singular_masculine}`
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const translation = $('.ToWrd').eq(1).text().trim();
        word.french_translations.push(translation.replace(/\badj\b/g, '').trim());

        // console.log("✅ french translations found \n");
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}