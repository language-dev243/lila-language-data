import chalk from "chalk";

import { readingSourceFile } from "./readingSourceFile";

export async function checkingJSONFiles(word: Word, sourceFilePath: FilePath) {

    const filePaths: FilePath[] = [
        "./data/processed/wordsInSupabase.json"
    ]

    console.log("💡 checking files")

    try {

        for (const filePath of filePaths) {

            const wordsArray: Words = await readingSourceFile(filePath);

            if (wordsArray.length > 0) {
                wordsArray.includes(word) ? true : false
            } else {
                return true;
            }
        }

    }
    catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}
