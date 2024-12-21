const fs = require("fs/promises");
const { createObjectCsvWriter } = require("csv-writer");

async function correctAdjectives() {
  try {
    const filePath = "./testData/adjectives_full_list.csv";
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split("\n");
    const words = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Split the line only at the first comma to separate word from translations
      const firstCommaIndex = line.indexOf(',');
      if (firstCommaIndex === -1) continue;

      const word = line.slice(0, firstCommaIndex).trim();
      let translations = line.slice(firstCommaIndex + 1).trim();
      
      // Remove surrounding quotes if they exist
      translations = translations.replace(/^"(.*)"$/, '$1');
      
      // Create the corrected line object
      const correctedLine = {
        word,
        // Store translations as an array to prevent CSV writer from adding quotes
        english_translations: translations.split(',').map(t => t.trim())
      };
      
      words.push(correctedLine);
    }
    return words;
  } catch (error) {
    console.error("Error reading or processing CSV file:", error);
    throw error;
  }
}

async function saveToCSV(correctedWords) {
  // Write directly to file using fs.writeFile instead of csv-writer
  // to have complete control over the output format
  try {
    let output = 'word,english_translations\n';
    
    correctedWords.forEach(({ word, english_translations }) => {
      // Join the translations array with commas and add to output
      output += `${word},${english_translations.join(',')}\n`;
    });
    
    await fs.writeFile('./testData/adjectives_full_list_corrected.csv', output);
    console.log("File saved");
  } catch (error) {
    console.error("Error saving CSV file:", error);
    throw error;
  }
}

async function main() {
  try {
    const correctedAdjectives = await correctAdjectives();
    await saveToCSV(correctedAdjectives);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();