
import { askToContinue } from "./askToContinue";
import { readingCSV } from "./readingCSV";
import { handlingAdjectives } from "./handlingAdjectives";
import { resolve } from "path";


async function main() {

    const sourceFilePath = "./data/test.csv"

    console.log("script starting now...\n")

    try {

        // step 1: reading from source csv
        console.log("💡 step 1: reading words from CSV...")
        const words = await readingCSV(sourceFilePath);
        console.log("✅ words found: ", words, "\n")
        await askToContinue()

        // step 2: detect category of words
        // await detectingCategory(words)

        // step 3: get word data based on category
        // case switch
        // await handlingAdjectives(word)

    } catch (error) {
        console.error("Unexpected error:", error.message);
    }

}

main();