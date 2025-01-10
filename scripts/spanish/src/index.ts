import chalk from "chalk"

import { readingSourceFile } from "./utils/readingSourceFile";
import { handlingAdjectives } from "./handlingAdjectives";

async function main() {

    const sourceFilePath: FilePath = "./data/sources/adjectives.json"

    try {

        // reading from source 
        const words: Words = await readingSourceFile(sourceFilePath);

        // processing words
        await handlingAdjectives(words, sourceFilePath)



    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}

main();
