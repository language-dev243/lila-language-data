import chalk from "chalk"

import { readingSourceFile } from "./utils/readingSourceFile";
import { handlingAdjectives } from "./handlingAdjectives";

async function main() {

    const sourceFilePath = "./data/sources/adjectives.json"
    let processedWords = []
    let processedWordsCount = 0;

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    try {

        // reading from source 
        const words = await readingSourceFile(sourceFilePath);

        /*
        
                // step 2: processing words, writing to csvs, uploading to supabase
                console.log(`${chalk.yellow("💡 processing words\n")}`)
                for (const word of words) {
                    console.log(`currently processing word ${chalk.blue(processedWordsCount + 1)}: ${chalk.green(word)}`)
                    await handlingAdjectives(word, sourceFilePath)
                    processedWords.push(word)
                    processedWordsCount += 1;
                    console.log(`\nprocessed words: ${chalk.blue(processedWordsCount)} of ${chalk.blue(words.length)} \n`)
                    // await sleep(1000);
                }
        
        */

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    }
}

main();
