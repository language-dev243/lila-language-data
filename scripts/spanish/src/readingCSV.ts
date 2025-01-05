import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function readingCSV(sourceFilePath) {
  try {
    const sourceData = await fs.readFile(sourceFilePath, "utf8");

    const parsed = Papa.parse(sourceData, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsed.data || parsed.data.length === 0) {
      console.warn(`${chalk.red("❌ CSV file is empty or has no data rows")}\n`)
      return null;
    }

    const words = parsed.data.map(row => row.word).filter(Boolean);

    return words;

  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
  }
}