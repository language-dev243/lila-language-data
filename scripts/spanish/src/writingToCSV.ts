import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function writingToCSV(word, targetFilePath) {

  console.log("💡 writing to CSV")

  try {

    const targetData = await fs.readFile(targetFilePath, "utf8");
    const wordObject = { word };
    const convertedWord = Papa.unparse([wordObject], { header: false })
    await fs.appendFile(targetFilePath, `\n${convertedWord}`);

    console.log(`${chalk.green("✅ succesfully written to csv")}\n`);

  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
  }
}