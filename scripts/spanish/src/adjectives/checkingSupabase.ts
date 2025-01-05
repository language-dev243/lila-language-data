import "dotenv/config";
import chalk from "chalk";
import { createClient } from '@supabase/supabase-js';

import { writingToCSV } from "../writingToCSV";
import { deletingFromCSV } from "../deletingFromCSV";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function checkingSupabase(adjective) {

    console.log("💡 checking supabase")

    try {

        const { data, error } = await supabase
            .from('spanish_adjectives')
            .select('id')
            .eq('singular_masculine', adjective)

        if (error) {
            console.error(`${chalk.red("Error checking the database: ", error)}`);
            return false;
        }

        if (data && data.length > 0) {
            console.log(`${chalk.blue(adjective, "already exists on supabase")}`);
            await writingToCSV(adjective, "./data/processed/wordsInSupabase.csv")
            await deletingFromCSV(adjective, "./data/sources/test.csv")
            return true;
        } else {
            console.log(`✅ ${chalk.green(adjective, "does not exist on supabase, proceeding...")}`);
            return false;
        }

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    }
}