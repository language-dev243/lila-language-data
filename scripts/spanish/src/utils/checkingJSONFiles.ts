import chalk from "chalk";

import { readingSourceFile } from "./readingSourceFile";

export async function checkingJSONFiles(adjective: Adjective, sourceFilePath: FilePath) {

    const filePaths: FilePath[] = [
        "./data/processed/wordsInSupabase.json"
    ]

    console.log("💡 checking exisiting json")

    try {

        for (const filePath of filePaths) {

            const wordsArray: Adjectives = await readingSourceFile(filePath);

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
