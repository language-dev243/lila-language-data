import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingTranslationsEnglish(word) {

    // console.log("💡 fetching english translations...")

    try {
        const url = `https://enes.dict.cc/?s=${word.singular_masculine}`
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const scriptContent = $('script:contains("var nres=")').text();

        const spanishWords = scriptContent.match(/var c1Arr = new Array\((.*?)\);/)[1];
        const englishWords = scriptContent.match(/var c2Arr = new Array\((.*?)\);/)[1];

        const regex = /"(.*?)"/g;

        const spanishWordsArray = spanishWords.match(regex).map(match => match.slice(1, -1)).slice(1);
        const englishWordsArray = englishWords.match(regex).map(match => match.slice(1, -1)).slice(1);

        spanishWordsArray.forEach((spanishWord, index) => {
            if (spanishWord === word.singular_masculine) {
                word.english_translations.push(englishWordsArray[index]);
            }
        });

        // console.log("✅ english translations found \n");
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}
