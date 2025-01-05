import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function deletingFromCSV() {

    console.log("💡 step 8: deleting from CSV...")

    const sourceFilePath = "./data/test.csv";

    try {
        const sourceData = await fs.readFile(sourceFilePath, "utf8");
        const lines = sourceData.split("\n");
        lines.splice(1, 1);
        const updatedData = lines.join("\n");
        await fs.writeFile(sourceFilePath, updatedData, "utf8");

        console.log("✅ word deleted \n")
    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    }
}