import chalk from "chalk"

import { readingCSV } from "./readingCSV";
import { handlingAdjectives } from "./handlingAdjectives";

async function main() {

    const sourceFilePath = "./data/sources/test.csv"
    let processedWords = []
    let processedWordsCount = 0;

    console.log(`\n ${chalk.blue("script starting now...")}\n`)

    try {

        // step 1: reading from source csv
        console.log(`${chalk.yellow("💡 step 1: reading words from CSV:")}`)
        const words = await readingCSV(sourceFilePath);
        console.log(`${chalk.green("✅", words.length, "words found \n")}`)

        // step 2: detect category of words
        // await detectingCategory(words)

        // step 3: get word data based on category
        console.log(`${chalk.yellow("💡 step 3: processing words\n")}`)
        for (const word of words) {
            console.log(`currently processing: ${chalk.green(word)}`)
            await handlingAdjectives(word)
            processedWords.push(word)
            processedWordsCount += 1;
            console.log(`processed words: ${chalk.blue(processedWordsCount)} of ${chalk.blue(words.length)} \n`)
        }

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    }
}

main();
