import "dotenv/config";
import { createClient } from '@supabase/supabase-js';

import { readingCSV } from "./readingCSV";
import { checkingWiktionary } from "./checkingWiktionary";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  try {
    // step 1: reading adjectives from source csv
    const adjectives = await readingCSV();

    // step 2: checking adjectives on wiktionary
    await checkingWiktionary(adjectives);
    
  } catch (error) {
      console.error("Unexpected error:", error.message);
  }
}

main();