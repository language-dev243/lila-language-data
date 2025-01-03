import { fetchingTranslationsEnglish } from "./fetchingTranslationsEnglish";

export async function fetchingTranslations(word) {

    console.log("💡 step 6: fetching translations...")

    try {

        await fetchingTranslationsEnglish(word)
         
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}