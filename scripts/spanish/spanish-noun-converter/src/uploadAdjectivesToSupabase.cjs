const fs = require("fs/promises");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

const supabaseUrl = "https://ymstbabtjmczzzynbdxs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc3RiYWJ0am1jenp6eW5iZHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MTY0MjQsImV4cCI6MjAzNjI5MjQyNH0.ZN7Q5_IZd64D2Ebt066cstifi6965uU820LsYkzWKAw";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const listOfAdjectives = path.resolve(__dirname, "./testData/tester.csv");
const listOfUploadedAdjectives = path.resolve(
  __dirname,
  "./testData/adjectives_uploaded.csv"
);
const listOfNotUploadedAdjectives = path.resolve(
  __dirname,
  "./testData/adjectives_not_uploaded.csv"
);

// ############################## downloadData ########################
async function downloadAdjectives() {
  try {
    const { data, error } = await supabase
      .from("spanish_adjectives")
      .select("word");
    if (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to download data from Supabase");
    }
    return data.map((item) => item.word);
  } catch (err) {
    console.error("Error in downloadData:", err);
  }
}

// ############################## fetchCSVData ########################
async function fetchCSVData() {
  try {
    const data = await fs.readFile(listOfAdjectives, "utf-8");
    const lines = data.split("\n");
    const csvWords = [];
    //starting from 1 to ignore the header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(",");
      const word = parts[0];
      csvWords.push(word);
    }
    return csvWords;
  } catch (error) {
    console.error("Error reading or processing CSV file:", error);
    throw error;
  }
}

// ############################## compareData ########################
async function compareData(adjectivesAlreadyInDatabase, adjectivesFromCSV) {
  return adjectivesFromCSV.filter(
    (word) => !adjectivesAlreadyInDatabase.includes(word)
  );
}

// ############################## sortWords ########################
// check the csv file that was corrected in compareData
// go through line by line
// if any line contains the following speacial letters:
// .:/()[]{}
// the line should be moved to listOfNotUploadedAdjectives.csv
// if the line doesnt contain these special letters
// the line should be moved to listOfUploadedAdjectives.csv
async function sortWords(wordsToSort) {
  try {
    // Initialize arrays to store valid and invalid words
    const validWords = [];
    const invalidWords = [];
    // Define regex pattern for special characters to check
    const specialCharacters = /[.:/()[\]{}]/;

    // Loop through words and sort them based on special characters
    wordsToSort.forEach((word) => {
      if (specialCharacters.test(word)) {
        invalidWords.push(word);
      } else {
        validWords.push(word);
      }
    });

    // Create CSV header for both files
    const validHeader = "word,english_translations\n";
    // Create CSV content for valid words
    const validContent = validWords.map((word) => `${word},`).join("\n");
    // Create CSV content for invalid words
    const invalidContent = invalidWords.map((word) => `${word},`).join("\n");

    // Write valid words to the upload CSV file
    await fs.writeFile(listOfUploadedAdjectives, validHeader + validContent);
    // Write invalid words to the not-upload CSV file
    await fs.writeFile(
      listOfNotUploadedAdjectives,
      validHeader + invalidContent
    );

    // Return valid words for potential future use
    return validWords;
  } catch (error) {
    console.error("Error in sortWords:", error);
    throw error;
  }
}

//##############################uploadDataToSupabase########################
async function uploadDataToSupabase() {
  try {
    // Read the CSV file containing validated words
    const data = await fs.readFile(listOfUploadedAdjectives, "utf-8");
    // Split the file into lines
    const lines = data.split("\n");
    // Array to store words for upload
    const wordsToUpload = [];

    // Process each line of the CSV, skipping header
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        // Extract just the word part before the comma
        const word = line.split(",")[0];
        wordsToUpload.push(word);
      }
    }

    // Check if there are any words to upload
    if (wordsToUpload.length === 0) {
      console.log("No words to upload");
      return;
    }

    // Convert words array to array of objects for Supabase
    const wordsToUploadAsObjects = wordsToUpload.map((word) => ({
      word: word,
    }));

    // Upload the words to Supabase
    const { data: uploadedData, error } = await supabase
      .from("spanish_adjectives")
      .insert(wordsToUploadAsObjects);

    // Handle any upload errors
    if (error) {
      console.error("Error uploading data:", error);
      throw new Error("Failed to upload data to Supabase");
    }

    // Log success message with count of uploaded words
    console.log(`Successfully uploaded ${wordsToUpload.length} words`);
  } catch (err) {
    console.error("Error in uploadDataToSupabase:", err);
    throw err;
  }
}

// ############################## main ########################
async function main() {
  try {
    const adjectivesAlreadyInDatabase = await downloadAdjectives();
    if (!adjectivesAlreadyInDatabase) throw new Error("No data from database.");
    console.log("successful database download (1/5) ✅");

    const adjectivesFromCSV = await fetchCSVData();
    if (!adjectivesFromCSV) throw new Error("No data from csv file.");
    console.log("successful CSV download (2/5) ✅");

    const wordsToUpload = await compareData(
      adjectivesAlreadyInDatabase,
      adjectivesFromCSV
    );
    if (wordsToUpload.length === 0) {
      console.log("No new words to upload.");
      return;
    }
    console.log("Successful data comparison (3/5) ✅");

    await sortWords(wordsToUpload);
    console.log("successful word sorting (4/5) ✅");

    //await uploadDataToSupabase();
    //console.log("successful database upload (5/5) ✅");
  } catch (err) {
    console.error("Error in main function:", err);
  }
}

main();

/*
exampledata of csv:

word,english_translations
académico,academic
accesible,accessible
barroco,baroque,elaborate
básico,basic,essential
bastante,rather,fairly,quite a bit (ADV)
bello,beautiful,fine
ninguno,no,none,nobody (PRON)
supuesto,supposed,por s.: of course



*/
