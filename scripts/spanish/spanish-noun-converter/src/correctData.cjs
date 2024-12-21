const fs = require("fs/promises");
const { createObjectCsvWriter } = require("csv-writer");

async function convertCsvData() {
  try {
    const filePath = "./testData/nounsFeminine.csv";
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split("\n");
    const words = [];
    const wordsWith3 = [];

    //starting from 1 to ignore the header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(",");

      if (parts.length === 3) {
        const id = parts[0];
        const word = parts[1];
        const english_translations = [parts[2]];
        const correctedWord = {
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

async function saveCorrectedCsv(correctedWords) {
  const csvWriter = createObjectCsvWriter({
    path: "./testData/wordsWith3.csv",
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
