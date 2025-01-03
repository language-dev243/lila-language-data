import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingTranslationsGerman(word) {

    console.log("- fetching german translations...")

    try {
        const url = `https://dees.dict.cc/?s=${word.singular_masculine}`
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const scriptContent = $('script:contains("var nres=")').text(); 

        const spanishWords = scriptContent.match(/var c1Arr = new Array\((.*?)\);/)[1];
        const germanWords = scriptContent.match(/var c2Arr = new Array\((.*?)\);/)[1]; 

        const regex = /"(.*?)"/g;
        const spanishWordsArray = spanishWords.match(regex).map(match => match.slice(1, -1)).slice(1);
        const germanWordsArray = germanWords.match(regex).map(match => match.slice(1, -1)).slice(1);

        console.log("spanish words: ", spanishWordsArray)
        console.log("german translations: ", germanWordsArray)

        spanishWordsArray.forEach((spanishWord, index) => {
            if (spanishWord === word.singular_masculine) {
                word.german_translations.push(germanWordsArray[index]);
            }
        });
        
        console.log("✅ german translations found \n");
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}
