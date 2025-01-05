import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function deletingFromCSV(word, targetFilePath) {

    console.log("💡 deleting from CSV")

    try {
        const sourceData = await fs.readFile(targetFilePath, "utf8");
        const lines = sourceData.split("\n");
        const parsedData = Papa.parse(sourceData, { header: true });

        if (parsedData.errors.length > 0) {
            throw new Error(chalk.red("Error parsing the CSV file"));
        }

        const updatedData = parsedData.data.filter((row) => row.word !== word);

        if (updatedData.length === parsedData.data.length) {
            console.log(`${chalk.yellow("⚠ word not found in CSV, no changes made")}\n`);
            return;
        }

        const updatedCSV = Papa.unparse(updatedData);

        await fs.writeFile(targetFilePath, updatedCSV, "utf8");

        console.log(`${chalk.green("✅ succesfully deleted from csv")}\n`);
    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    }
}