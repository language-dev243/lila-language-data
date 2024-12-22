import "dotenv/config";
import { createClient } from '@supabase/supabase-js';

import { readingCSV } from "./readingCSV";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  try {
    const adjectives = readingCSV();
    console.log("adjectives: ", adjectives)
  } catch (error) {
      console.error("Unexpected error:", error.message);
  }
}

main();