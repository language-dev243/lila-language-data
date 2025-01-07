import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function checkingAgainstCSV(word) {

    const csvFilePaths = [
        "./data/processed/wordsInSupabase.csv",
        "./data/processed/withEror/inflections.csv",
        "./data/processed/withEror/ipa.csv",
        "./data/processed/withEror/syllabifications.csv",

        "./data/processed/withEror/translationsDE.csv",
        "./data/processed/withEror/translationsEN.csv",
        "./data/processed/withEror/translationsFR.csv",
        "./data/processed/withEror/translationsIT.csv",

        "./data/processed/withEror/wiktionary.csv",
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