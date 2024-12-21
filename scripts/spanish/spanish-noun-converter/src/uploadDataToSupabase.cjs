const fs = require("fs/promises");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

const supabaseUrl = "https://ymstbabtjmczzzynbdxs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc3RiYWJ0am1jenp6eW5iZHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MTY0MjQsImV4cCI6MjAzNjI5MjQyNH0.ZN7Q5_IZd64D2Ebt066cstifi6965uU820LsYkzWKAw";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const csvFilePath = path.resolve(__dirname, "./testData/list.csv");

// ############################## downloadData ########################
async function downloadData() {
  try {
    const { data, error } = await supabase.from("spanish_nouns").select("word");
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
    const data = await fs.readFile(csvFilePath, "utf-8");
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
async function compareData(databaseWords, csvWords) {
  return csvWords.filter((word) => !databaseWords.includes(word));
}

//##############################begin - uploadDataToSupabase########################
async function uploadDataToSupabase(wordsToUpload) {
  if (wordsToUpload.length === 0) {
    console.log("No new words to upload.");
    return;
  }

  const wordsToUploadAsObjects = wordsToUpload.map((word) => ({
    word: word,
    grammatical_gender: "feminine",
  }));

  try {
    const { data, error } = await supabase
      .from("spanish_nouns")
      .insert(wordsToUploadAsObjects);
    if (error) {
      console.error("Error uploading data:", error);
      throw new Error("Failed to upload data to Supabase");
    }
  } catch (err) {
    console.error("Error in uploadDataToSupabase:", err);
  }
}

// ############################## main ########################
async function main() {
  try {
    const databaseWords = await downloadData();
    if (!databaseWords) throw new Error("No data from database.");
    console.log("successful database download (1/4) ✅");

    const csvWords = await fetchCSVData();
    if (!csvWords) throw new Error("No data from csv file.");
    console.log("successful CSV download (2/4) ✅");

    const wordsToUpload = await compareData(databaseWords, csvWords);
    if (wordsToUpload.length === 0) {
      console.log("No new words to upload.");
      return;
    }
    console.log("Successful data comparison (3/4) ✅");

    await uploadDataToSupabase(wordsToUpload);
    console.log("successful database upload (4/4) ✅");
  } catch (err) {
    console.error("Error in main function:", err);
  }
}

main();
