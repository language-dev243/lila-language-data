import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function checkingAgainstCSV(word) {

    const csvFilePaths = [
        "./data/processed/wordsInSupabase.csv",
        "./data/processed/withError/inflections.csv",
        "./data/processed/withError/ipa.csv",
        "./data/processed/withError/syllabifications.csv",

        "./data/processed/withError/translationsDE.csv",
        "./data/processed/withError/translationsEN.csv",
        "./data/processed/withError/translationsFR.csv",
        "./data/processed/withError/translationsIT.csv",

        "./data/processed/withError/wiktionary.csv",
    ]

    console.log("💡 checking csv files")

    try {

        for (const filePath of csvFilePaths) {
            console.log(`💡 checking ${filePath}`)
            const csvData = await fs.readFile(filePath, "utf8");
            const parsedCSVData = Papa.parse(csvData, { header: false, skipEmptyLines: true }).data;
            const wordExistsInCSV = parsedCSVData.some((row) => row[0] === word);

            if (wordExistsInCSV) {
                console.log(`${chalk.red("⚠️ ", word, " already exists in csv")}`);
                return;
            }

        }

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    }

}