const axios = require("axios");
const cheerio = require("cheerio");
const readline = require("readline");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ymstbabtjmczzzynbdxs.supabase.co";

// key here but not for you to see

const serviceRoleSecret =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc3RiYWJ0am1jenp6eW5iZHhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDcxNjQyNCwiZXhwIjoyMDM2MjkyNDI0fQ.em3LI5gJbHupMXiMeZJDlvgPyIeaU_iIX9lcKSwg_84";

const supabase = createClient(supabaseUrl, serviceRoleSecret, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readingCSV() {
  const filePath = "./datafiles/adjectivesNotInWiktionary.csv";
  if (!fs.existsSync(filePath)) {
    console.log(
      "🚫 CSV file not found. Proceeding with all database adjectives."
    );
    return;
  }
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const existingAdjectives = data
      .split("\n")
      .slice(1) // Skip header
      .map((line) => line.trim()) // Extract and trim words
      .filter((line) => line !== "");

    return existingAdjectives;
  } catch (err) {
    console.error("Error in downloadData:", err);
  }
}

async function downloadData(adjectiveCount) {
  try {
    const { data, error } = await supabase
      .from("spanish_adjectives")
      .select("adjective_singular_masculine")
      .eq("ipa_singular_masculine", "")
      .limit(adjectiveCount);
    if (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to download data from Supabase");
    }
    return data.map((item) => item.adjective_singular_masculine);
  } catch (err) {
    console.error("Error in downloadData:", err);
  }
}

async function filterCSVWords(adjectivesFromDatabase) {
  const filePath = "./datafiles/adjectivesNotInWiktionary.csv";

  if (!fs.existsSync(filePath)) {
    console.log(
      "🚫 CSV file not found. Proceeding with all database adjectives."
    );
    return adjectivesFromDatabase;
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const existingAdjectives = data
      .split("\n")
      .slice(1) // Skip header
      .map((line) => line.trim()) // Extract and trim words
      .filter((line) => line !== "");

    console.log("adjectives from csv: ", existingAdjectives);
    console.log("adjectives from database: ", adjectivesFromDatabase);

    console.log("starting filtering...");
    // Filter out existing adjectives
    const filteredAdjectives = adjectivesFromDatabase.filter(
      (adjective) => !existingAdjectives.includes(adjective)
    );

    console.log("filtered adjectives: ", filteredAdjectives, "\n");

    console.log(
      `✅ ${filteredAdjectives.length} adjectives remain after filtering.\n`
    );
    return filteredAdjectives;
  } catch (err) {
    console.error("Error in downloadData:", err);
    return adjectivesFromDatabase; // Fallback to original list if error occurs
  }
}

// here for future use
async function convertSingleAdjective(adjective) {
  const accentMap = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
  };

  let convertedAdjective = adjective;

  for (const [accented, unaccented] of Object.entries(accentMap)) {
    convertedAdjective = convertedAdjective.replaceAll(accented, unaccented);
  }

  return convertedAdjective;
}

async function checkWiktionary(
  adjectivesConverted,
  adjectivesInWiktionary,
  adjectivesNotInWiktionary
) {
  for (const adjective of adjectivesConverted) {
    // convertSingleAdjective(adjective); stays here for future use
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      adjective
    )}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        adjectivesInWiktionary.push(adjective);
      } else {
        adjectivesNotInWiktionary.push(adjective);
      }
    } catch (err) {
      console.error(`🚫 Error checking Wiktionary for this: ${adjective}`);
      adjectivesNotInWiktionary.push(adjective);
    }

    await delay(300);
  }
}

async function saveToCSV(adjectivesNotInWiktionary) {
  const filePath = "./datafiles/adjectivesNotInWiktionary.csv";

  // Check if the file exists
  let existingAdjectives = [];
  if (fs.existsSync(filePath)) {
    // Read the current content of the CSV
    const data = fs.readFileSync(filePath, "utf8");
    existingAdjectives = data
      .split("\n")
      .slice(1) // Skip the header
      .map((line) => line.split(",")[0].trim()); // Extract the adjective from each line
  }

  const csvWriter = createCsvWriter({
    path: filePath,
    header: [{ id: "adjective", title: "adjective" }],
  });

  // Filter out adjectives that already exist in the file
  const newAdjectives = adjectivesNotInWiktionary.filter(
    (adjective) => !existingAdjectives.includes(adjective)
  );

  // If there are new adjectives, write them to the CSV file
  if (newAdjectives.length > 0) {
    const records = newAdjectives.map((adjective) => ({ adjective }));
    try {
      await csvWriter.writeRecords(records);
      console.log(`✅ Saved ${newAdjectives.length} new adjectives to CSV.`);
    } catch (err) {
      console.error("Error saving to CSV:", err);
    }
  } else {
    console.log("No new adjectives to save.");
  }
}

async function fetchingIPA(adjectivesInWiktionary) {
  const adjectivesWithIPA = [];
  for (const adjective of adjectivesInWiktionary) {
    // convertSingleAdjective(adjective); stays here for future use
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      adjective
    )}`;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      let ipa = $("td")
        .filter(function () {
          return /pronunciación|no seseante|seseante|clásico|eclesiástico|yeísta|no yeísta|sheísta|zheísta/i.test(
            $(this).text()
          );
        })
        .nextAll("td") // Look at the following <td> elements to find IPA
        .first() // Ensure we're only selecting the first match
        .text()
        .trim();

      let cleanedIpa = "";

      const closingBracketIndex = ipa.indexOf("]");
      if (closingBracketIndex !== -1) {
        cleanedIpa = ipa.slice(0, closingBracketIndex + 1);
      }

      const adjectiveObject = {
        adjective_singular_masculine: adjective,
        ipa_singular_masculine: cleanedIpa,
      };
      console.log(adjectiveObject);
      adjectivesWithIPA.push(adjectiveObject);
    } catch (err) {
      console.error("Error in fetchingIPA:", err);
    }
  }
  return adjectivesWithIPA;
}

function askToContinue() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "Do you want to continue with the next step? (Y/n) ",
      (answer) => {
        rl.close();
        resolve(answer.trim().toLowerCase() === "y" || answer.trim() === "");
      }
    );
  });
}

async function uploadDataToSupabase(adjectivesWithIPA) {
  try {
    const { data, error } = await supabase
      .from("spanish_adjectives")
      .upsert(adjectivesWithIPA, {
        onConflict: ["adjective_singular_masculine"],
      });

    if (error) {
      console.error("Error uploading data:", error);
      throw new Error("Failed to upload data to Supabase");
    }
  } catch (err) {
    console.error("Error in uploadDataToSupabase:", err);
  }
}

async function main() {
  let adjectivesFromDatabase = [];
  let adjectivesWithoutCSV = [];
  let adjectivesWithIPA = [];
  let adjectivesInWiktionary = [];
  let adjectivesNotInWiktionary = [];
  let adjectiveCount = 5;

  try {
    // reading from csv
    const adjectivesInCSV = (await readingCSV()) || [];
    console.log("adjectivews in cvs: ", adjectivesInCSV);

    // step 1: download adjectives from supabase
    console.log("✅ step 1/6 download data from database:\n");
    adjectivesFromDatabase = await downloadData(adjectiveCount);
    console.log(
      `✅ ${adjectivesFromDatabase.length} adjectives found in database.\n`
    );

    // probably not needed anymore
    // step 2: exclude words from csv files
    // console.log("✅ step 2/6 reading from csv...");
    // adjectivesWithoutCSV = await filterCSVWords(adjectivesFromDatabase);

    // step 3: check if words are on wiktionary
    console.log("✅ step 3/6 checking wiktionary for words:\n");
    await checkWiktionary(
      adjectivesWithoutCSV,
      adjectivesInWiktionary,
      adjectivesNotInWiktionary
    );
    console.log(
      `✅ ${adjectivesInWiktionary.length} adjectives found in wiktionary.\n`
    );

    if (adjectivesNotInWiktionary.length != 0) {
      console.log(
        `🚫 ${adjectivesNotInWiktionary.length} adjectives found NOT in wiktionary.\n`
      );
    }

    // step x: save to csv
    await saveToCSV(adjectivesNotInWiktionary);

    // step 5: fetch IPA from wiktionary
    console.log("✅ step 5/6 fetching IPA from wiktionary:\n");
    adjectivesWithIPA = await fetchingIPA(adjectivesInWiktionary);

    // ask user if he wants to continue
    if (!(await askToContinue())) {
      console.log("🚫 operation aborted!");
      return;
    }

    // step 6: upload the IPA to supabase
    console.log("✅ step 6/6 uploading to supabase...\n");
    await uploadDataToSupabase(adjectivesWithIPA);
    console.log("✅ upload successfull!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
  process.exit(0);
}

main();
