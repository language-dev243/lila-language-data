import fs from "fs/promises";
import Papa from "papaparse";

export async function readingCSV() {

  console.log("💡 step 1: reading from CSV...")

  const sourceFilePath = "./data/test.csv";
  try {
  const sourceData = await fs.readFile(sourceFilePath, "utf8");
  
  const parsed = Papa.parse(sourceData, {
    header: true,
    skipEmptyLines: true,
  });

  const firstRow = parsed.data[0];
    if (!firstRow) {
      console.warn("❌ CSV file is empty or has no data rows.");
      return null;
    }

    const word = firstRow.word;
    console.log("✅ word found: ", word, "\n")

  return word;

  } catch (error) {
      console.error("Unexpected error:", error.message);
  }
}