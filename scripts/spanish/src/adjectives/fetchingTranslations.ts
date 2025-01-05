import chalk from "chalk";

import { fetchingTranslationsEnglish } from "./fetchingTranslationsEnglish";
import { fetchingTranslationsGerman } from "./fetchingTranslationsGerman";
import { fetchingTranslationsItalian } from "./fetchingTranslationsItalian";
import { fetchingTranslationsFrench } from "./fetchingTranslationsFrench";

export async function fetchingTranslations(word) {

    console.log("💡 fetching translations:")

    try {
        await fetchingTranslationsEnglish(word)
        await fetchingTranslationsGerman(word)
        await fetchingTranslationsItalian(word)
        await fetchingTranslationsFrench(word)
    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
        return
    }
}