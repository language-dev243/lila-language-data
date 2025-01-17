import fs from "fs/promises";
import chalk from "chalk";

export async function readingLocalJSON(): Promise<Adjectives> {

    console.log(`${chalk.white("💡 reading local database")}`)

    const filePath: FilePath = "./data/wordsInSupabase.json"

    const localAdjectives: Adjectives = []

    try {
        const fileContent = await fs.readFile(filePath, "utf8");
        const words = JSON.parse(fileContent);

        if (!words || words.length === 0) {
            console.warn(`${chalk.red("❌ json file is empty or has no data rows")}\n`)
            return [];
        }

        console.log(`${chalk.green("✅", words.length, "words found")}`)

        for (const word of words) {
            localAdjectives.push(word)
        }


    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }

    return localAdjectives
}