import axios from "axios";
import * as cheerio from 'cheerio';
import chalk from "chalk";

export async function fetchingTranslationsFrench(word) {

    console.log("💡 french")

    try {
        const url = `https://www.wordreference.com/esfr/${word.singular_masculine}`
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const translation = $('.ToWrd').eq(1).text().trim();
        word.french_translations.push(translation.replace(/\badj\b/g, '').trim());

        console.log(`${chalk.green("✅ french translations found")}`);

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
        return
    }
}