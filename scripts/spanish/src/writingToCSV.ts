import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function writingToCSV(word, targetFilePath) {

  console.log("💡 writing to CSV")

  try {

    const csvData = await fs.readFile(targetFilePath, "utf8");
    const parsedCSVData = Papa.parse(csvData, { header: false, skipEmptyLines: true }).data;

    const wordExistsInCSV = parsedCSVData.some((row) => row[0] === word);

    if (wordExistsInCSV) {
      console.log(`${chalk.yellow("⚠️ ", word, " already exists in the CSV file, skipping write")}`);
      return;
    }

    const wordObject = { word };
    const convertedWord = Papa.unparse([wordObject], { header: false })
    await fs.appendFile(targetFilePath, `\n${convertedWord}`);

    console.log(`${chalk.green("✅ succesfully written to csv")}`);

  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
  }
}