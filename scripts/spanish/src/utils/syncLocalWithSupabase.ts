import chalk from "chalk";
import "dotenv/config";
import {createClient} from "@supabase/supabase-js";

import {readingLocalJSON} from "./readingLocalJSON";
import {downloadingSupabaseData} from "./downloadingSupabaseData";
import {creatingLocalBackup} from "./creatingLocalBackup";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function syncLocalWithSupabase() {
  console.log(`${chalk.blue("\n💡 syncing local data with supabase")}`);

  try {
    // loading local data
    const localData: Adjectives = await readingLocalJSON();

    // loading supabase data
    const supabaseData: Adjectives = await downloadingSupabaseData();

    // comparing local data with supabase data
    const isEqual = JSON.stringify(localData) === JSON.stringify(supabaseData);

    console.log(`${chalk.white("💡 comparing local data with supabase")}`);
    // if local data doesnt equal supabase data, supabase gets written to local json
    if (isEqual) {
      console.log(chalk.yellow("⚠ local data is up-to-date with supabase\n"));
      return;
    } else {
      console.log(`${chalk.yellow("⚠ differences found")}`);
      await creatingLocalBackup(supabaseData);
    }
  } catch (error) {
    console.log(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
  }
}
