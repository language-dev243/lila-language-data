import chalk from "chalk"

import { readingSourceFile } from "./utils/readingSourceFile";
import { handlingAdjectives } from "./handlingAdjectives";

async function main() {


    try {

        // reading from the source json
        const words: Words = await readingSourceFile()

        // processing adjectives
        await handlingAdjectives(words)

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}

main();
