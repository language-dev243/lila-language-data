import fs from "fs/promises";

import chalk from "chalk";

export async function readingSourceFile() {

    console.log(`${chalk.blue("💡 reading new words")}`)

    const filePath: FilePath = "./data/sources/adjectives.json"

    const wordsArray: Words = []

    try {
        const fileContent = await fs.readFile(filePath, "utf8");
        const words = JSON.parse(fileContent);

        if (!words || words.length === 0) {
            console.warn(`${chalk.red("❌ json file is empty or has no data rows")}\n`)
            return []
        }

        console.log(`${chalk.green("✅", words.length, "words found in source file\n")}`)

        for (const word of words) {
            wordsArray.push(word)
        }

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }

    return wordsArray
}