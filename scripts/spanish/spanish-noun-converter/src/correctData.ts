import fs from "fs/promises";
import { createObjectCsvWriter } from "csv-writer";

interface Word {
  id: string;
  word: string;
  english_translations: string[];
}

async function convertCsvData(): Promise<Word[]> {
  try {
    const filePath = "./nounsMasculine.csv";
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split("\n");
    const words: Word[] = [];
    const wordsWith3: Word[] = [];
    const wordsWith4: Word[] = [];
    const wordsWith5: Word[] = [];
    const wordsWith6: Word[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(",");

      if (parts.length === 3) {
        const id = parts[0];
        const word = parts[1];
        const english_translations = [parts[2]];
        const correctedWord: Word = {
          id,
          word,
          english_translations,
        };
        wordsWith3.push(correctedWord);
      }
    }
    return wordsWith3;
  } catch (error) {
    console.error("Error reading or processing CSV file:", error);
    throw error;
  }
}

async function saveCorrectedCsv(correctedWords: Word[]) {
  const csvWriter = createObjectCsvWriter({
    path: "./wordsWith3.csv",
    header: [
      { id: "id", title: "id" },
      { id: "word", title: "word" },
      { id: "english_translations", title: "english_translations" },
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
    const correctedWords = await convertCsvData();
    await saveCorrectedCsv(correctedWords);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
