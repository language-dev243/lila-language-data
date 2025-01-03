import { fetchingTranslationsEnglish } from "./fetchingTranslationsEnglish";
import { fetchingTranslationsGerman } from "./fetchingTranslationsGerman";

export async function fetchingTranslations(word) {

    console.log("💡 step 6: fetching translations...")

    try {

        await fetchingTranslationsEnglish(word)
        await fetchingTranslationsGerman(word)

        console.log("word: ", word)
         
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}