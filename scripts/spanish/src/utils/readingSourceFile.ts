import fs from "fs/promises";

import chalk from "chalk";

export async function readingSourceFile(sourceFilePath) {

    console.log(`${chalk.white("\n💡 reading from source")}`)

    try {
        const fileContent = await fs.readFile(sourceFilePath, "utf8");
        const wordsArray = JSON.parse(fileContent);

        if (!wordsArray || wordsArray.length === 0) {
            console.warn(`${chalk.red("❌ json file is empty or has no data rows")}\n`)
            return null;
        }

        console.log(`${chalk.green("✅", wordsArray.length, "words found \n")}`)
        return wordsArray

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }

}