import fs from "fs/promises";
import Papa from "papaparse";
import chalk from "chalk";

export async function deletingFromCSV(word, targetFilePath) {
  console.log("💡 deleting from CSV");

  try {
    const sourceData = await fs.readFile(targetFilePath, "utf8");

    const parsedData = Papa.parse(sourceData, {
      header: true,
      skipEmptyLines: true,
      delimiter: "\n",
    });

    if (parsedData.errors.length > 0) {
      // Log the detailed error information
      console.log(chalk.red("CSV Parsing Errors:"));
      parsedData.errors.forEach((error, index) => {
        console.log(`${chalk.red(`Error ${index + 1}:`)} ${error.message}`);
        console.log(`${chalk.red("Row:")} ${error.row}`);
        console.log(`${chalk.red("Code:")} ${error.code}`);
        console.log(`${chalk.red("Type:")} ${error.type}`);
      });
      throw new Error(chalk.red("Error parsing the CSV file"));
    }

    const updatedData = parsedData.data.filter((row) => row.word !== word);

    if (updatedData.length === parsedData.data.length) {
      console.log(
        `${chalk.yellow("⚠ word not found in CSV, no changes made")}\n`,
      );
      return;
    }

    const updatedCSV = Papa.unparse(updatedData);

    await fs.writeFile(targetFilePath, updatedCSV, "utf8");

    console.log(`${chalk.green("✅ succesfully deleted from source csv")}`);
  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`);
  }
}
