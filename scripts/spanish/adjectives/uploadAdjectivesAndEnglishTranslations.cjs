const fs = require("fs/promises");
const Papa = require("papaparse");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ymstbabtjmczzzynbdxs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc3RiYWJ0am1jenp6eW5iZHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MTY0MjQsImV4cCI6MjAzNjI5MjQyNH0.ZN7Q5_IZd64D2Ebt066cstifi6965uU820LsYkzWKAw";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function parseCSV() {
  const dataPath = "./datafiles/list.csv";
  const csvData = await fs.readFile(dataPath, "utf8");

  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  const adjectives = parsed.data.map((row) => ({
    adjective_singular_masculine: row.word,
    english_translations: [
      row.english_translations,
      row.english_translations2,
      row.english_translations3,
      row.english_translations4,
      row.english_translations5,
      row.english_translations6,
    ].filter(Boolean),
  }));

  return adjectives;
}

async function downloadData() {
  try {
    const { data, error } = await supabase
      .from("spanish_adjectives")
      .select("adjective_singular_masculine");
    if (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to download data from Supabase");
    }
    return data.map((item) => item.word);
  } catch (err) {
    console.error("Error in downloadData:", err);
  }
}

async function compareData(databaseWords, csvWords) {
  return csvWords.filter((word) => !databaseWords.includes(word));
}

async function uploadDataToSupabase(wordsToUpload) {
  try {
    const { data, error } = await supabase
      .from("spanish_adjectives")
      .insert(wordsToUpload);
    if (error) {
      console.error("Error uploading data:", error);
      throw new Error("Failed to upload data to Supabase");
    }
  } catch (err) {
    console.error("Error in uploadDataToSupabase:", err);
  }
}

async function main() {
  let adjectivesFromCSV = [];
  let adjectivesFromDatabase = [];

  try {
    // step 1: reading csv file
    console.log("✅ step 1/4 parsing source file:");
    adjectivesFromCSV = await parseCSV();
    console.log(`✅ ${adjectivesFromCSV.length} words parsed.\n`);

    // step 2: download adjectives from database
    console.log("✅ step 2/4 download data from database:");
    adjectivesFromDatabase = await downloadData();
    console.log(`✅ ${adjectivesFromDatabase.length} found in database.\n`);

    // step 3: compare adjectives from csv and database
    console.log("✅ step 3/4 compare words from csv and database:");
    const wordsToUpload = await compareData(
      adjectivesFromDatabase,
      adjectivesFromCSV
    );

    // step 4: uploading adjectives
    console.log("✅ step 4/4 uploading adjectives to supabase:");
    await uploadDataToSupabase(wordsToUpload);
  } catch (error) {
    console.error("An error occurred:", error);
  }
  process.exit(0);
}

main();
