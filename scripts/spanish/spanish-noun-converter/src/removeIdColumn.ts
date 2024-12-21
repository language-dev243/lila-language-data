import fs from "fs/promises";
import { createObjectCsvWriter } from "csv-writer";

interface WordWithoutId {
  word: string;
  english_translations: string[];
}

async function removeIdColumn(): Promise<WordWithoutId[]> {
  try {
    const filePath = "./csvData/nouns_masculine.csv";
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split("\n");
    const wordsWithoutId: WordWithoutId[] = [];

    //starting from 1 to ignore the header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(",");
      const word = parts[1];
      const english_translation = parts[2];

      const correctedWord: WordWithoutId = {
        word,
        english_translations: [english_translation],
      };

      wordsWithoutId.push(correctedWord);
    }
    return wordsWithoutId;
  } catch (error) {
    console.error("Error reading or processing CSV file:", error);
    throw error;
  }
}

async function saveCorrectedCsv(correctedWords: WordWithoutId[]) {
  const csvWriter = createObjectCsvWriter({
    path: "./testData/list.csv",
    header: [
      { id: "word", title: "Word" },
      { id: "english_translations", title: "English Translations" },
    ],
  });

  await csvWriter.writeRecords(
    correctedWords.map((word) => ({
      ...word,
    }))
  );

  console.log("file saved");
}

async function main() {
  try {
    const correctedWords = await removeIdColumn();
    await saveCorrectedCsv(correctedWords);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
