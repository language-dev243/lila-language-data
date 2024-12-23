import "dotenv/config";
import { createClient } from '@supabase/supabase-js';

import { askToContinue } from "./askToContinue";
import { readingCSV } from "./readingCSV";
import { checkingWiktionary } from "./checkingWiktionary";
import { writingToCSV } from "./writingToCSV";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  try {
    // step 1: reading adjectives from source csv
    console.log("💡 step 1: reading from CSV...")
    const adjectives = await readingCSV();
    console.log("✅ adjectives found: ", adjectives.length)
    await askToContinue()

    // step 2: checking adjectives on wiktionary
    console.log("💡 step 2: checking iktionary...")
    const {adjectivesInWiktionary, adjectivesNotInWiktionary} = await checkingWiktionary(adjectives);
    console.log("✅ adjectives in wiktionary: ", adjectivesInWiktionary.length)
    console.log("✅ adjectives not in wiktionary: ", adjectivesNotInWiktionary.length)
    await askToContinue()

    // step 3: writing adjectives to csv files
    console.log("💡 step 3: writing  to csv...")
    await writingToCSV(adjectivesInWiktionary, adjectivesNotInWiktionary)


  } catch (error) {
      console.error("Unexpected error:", error.message);
  }
}

main();