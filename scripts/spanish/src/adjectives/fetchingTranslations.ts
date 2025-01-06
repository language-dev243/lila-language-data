import chalk from "chalk";

import { writingToCSV } from "../writingToCSV";
import { deletingFromCSV } from "../deletingFromCSV";

import { fetchingTranslationsEnglish } from "./fetchingTranslationsEnglish";
import { fetchingTranslationsGerman } from "./fetchingTranslationsGerman";
import { fetchingTranslationsItalian } from "./fetchingTranslationsItalian";
import { fetchingTranslationsFrench } from "./fetchingTranslationsFrench";

export async function fetchingTranslations(word, sourceFilePath) {

    console.log("💡 fetching translations:")

    try {
        await fetchingTranslationsEnglish(word, sourceFilePath)
        await fetchingTranslationsGerman(word, sourceFilePath)
        await fetchingTranslationsItalian(word, sourceFilePath)
        await fetchingTranslationsFrench(word, sourceFilePath)
    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
        await writingToCSV(word.singular_masculine, "./data/processed/withError/translations.csv")
        await deletingFromCSV(word.singular_masculine, sourceFilePath)
        return
    }
}