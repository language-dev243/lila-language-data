import { fetchingTranslationsEnglish } from "./fetchingTranslationsEnglish";
import { fetchingTranslationsGerman } from "./fetchingTranslationsGerman";
import { fetchingTranslationsItalian } from "./fetchingTranslationsItalian";
import { fetchingTranslationsFrench } from "./fetchingTranslationsFrench";

export async function fetchingTranslations(word) {

    console.log("💡 step 6: fetching translations:\n")

    try {
        await fetchingTranslationsEnglish(word)
        await fetchingTranslationsGerman(word)
        await fetchingTranslationsItalian(word)
        await fetchingTranslationsFrench(word)
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}