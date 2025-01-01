import axios from "axios";

export async function fetchingTranslations(word) {

    console.log("💡 step 6: fetching translations...")

    try {

        const languagePairs = ["enes", "dees"]

        for (const languagePair of languagePairs) {

            const url = `https://${languagePair}.dict.cc/?s=${word.singular_masculine}`
            console.log("language pair: ", languagePair)
            console.log("url: ", url)
        const response = await axios.get(url);

        const translation = response.data;
        }

        console.log("✅ translations found: ", translation);
         
    } catch (error) {
        console.error("Unexpected error:", error.message);
        return
    }
}