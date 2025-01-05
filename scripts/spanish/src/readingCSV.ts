import fs from "fs/promises";
import Papa from "papaparse";

export async function readingCSV(sourceFilePath) {
  try {
    const sourceData = await fs.readFile(sourceFilePath, "utf8");

    const parsed = Papa.parse(sourceData, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsed.data || parsed.data.length === 0) {
      console.warn("❌ CSV file is empty or has no data rows");
      return null;
    }

    const words = parsed.data.map(row => row.word).filter(Boolean);

    return words;

  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}