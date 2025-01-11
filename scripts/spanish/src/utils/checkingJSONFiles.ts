import chalk from "chalk";

import { readingSourceFile } from "./readingSourceFile";

export async function checkingJSONFiles(adjective: SpanishAdjective, sourceFilePath: FilePath) {

    const filePaths: FilePath[] = [
        "./data/processed/wordsInSupabase.json"
    ]

    console.log("💡 checking files")

    try {

        for (const filePath of filePaths) {

            const wordsArray: SpanishAdjectives = await readingSourceFile(filePath);

            if (wordsArray.length > 0) {
                wordsArray.includes(adjective) ? true : false
            } else {
                return true;
            }
        }

    }
    catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}
