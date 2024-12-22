import fs from "fs/promises";
import Papa from "papaparse";

export async function readingCSV() {
  const sourceFilePath = "./data/source.csv";
  const sourceData = await fs.readFile(sourceFilePath, "utf8");

  const parsed = Papa.parse(sourceData, {
    header: true,
    skipEmptyLines: true,
  });

  const adjectives = parsed.data.map((row) => ({
    adjective_singular_masculine: row.word
  }));

  return adjectives;
}