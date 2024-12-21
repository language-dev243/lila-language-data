const fs = require("fs/promises");
const { createObjectCsvWriter } = require("csv-writer");

async function removeID() {
  try {
    const filePath = "./testData/adjectives_full_list.csv";
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split("\n");
    const words = [];

    // looping through every line
    // starting from 1 to ignore the header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(",");
      const [, ...wordData] = parts;
      words.push({
        word: wordData[0],
        english_translations: wordData
          .slice(1)
          .join(",")
          .replace(/(^"|"$)/g, ""),
      });
    }

    return words;
  } catch (error) {
    console.error("Error reading or processing CSV file:", error);
    throw error;
  }
}

async function saveToCSV(correctedWords) {
  const csvWriter = createObjectCsvWriter({
    path: "./testData/adjectives_full_list_without_id.csv",
    header: [
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
    const wordListWithoutID = await removeID();
    await saveToCSV(wordListWithoutID);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();

/*
example data of the csv file:

id,word,english_translations
3,abandonado,abandoned
7,abierto,"open, unlocked"
18,absoluto,absolute
20,abstracto,abstract
21,absurdo,absurd
25,abundante,"abundant, plentiful"
27,aburrido,"boring, bored"
34,académico,academic
38,accesible,accessible
46,aceptable,"acceptable, suitable"
70,activo,active
566,bastante,"rather, fairly, quite a bit (ADV)"

 */
