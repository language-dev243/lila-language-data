const fs = require("fs/promises");
const { createObjectCsvWriter } = require("csv-writer");

async function removeParantheses() {
  try {
    const filePath = "./testData/wordsWith3.csv";
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split("\n");
    const wordsWithoutParantheses = [];

    //starting from 1 to ignore the header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(",");
      const id = parts[0];
      const word = parts[1];
      let english_translation = parts[2];
      english_translation = english_translation.replace(/\(.*?\)/g, "").trim();
      const english_translations = [english_translation];

      const correctedWord = {
        id,
        word,
        english_translations,
      };

      wordsWithoutParantheses.push(correctedWord);
    }
    return wordsWithoutParantheses;
  } catch (error) {
    console.error("Error reading or processing CSV file:", error);
    throw error;
  }
}

async function saveCorrectedCsv(correctedWords) {
  const csvWriter = createObjectCsvWriter({
    path: "./testData/wordsWith3WithoutParantheses.csv",
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
    const correctedWords = await removeParantheses();
    await saveCorrectedCsv(correctedWords);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
