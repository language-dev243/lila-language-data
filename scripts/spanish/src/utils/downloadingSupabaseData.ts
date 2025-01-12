import fs from "fs/promises";
import chalk from "chalk";
import "dotenv/config";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function downloadingSupabaseData() {

    console.log(`${chalk.white("💡 reading supabase database")}`)

    const CONFIG = {
        DATABASE: {
            TABLE: 'spanish_adjectives',
            FIELDS: [
                'singular_masculine',
                'singular_feminine',
                'plural_masculine',
                'plural_feminine',
                'ipa_singular_masculine',
                'ipa_singular_feminine',
                'ipa_plural_masculine',
                'ipa_plural_feminine',
                'syllabification_singular_masculine',
                'syllable_count_singular_masculine',
                'syllabification_singular_feminine',
                'syllable_count_singular_feminine',
                'syllabification_plural_masculine',
                'syllable_count_plural_masculine',
                'syllabification_plural_feminine',
                'syllable_count_plural_feminine',
                'links_to_audio_files_singular_masculine',
                'links_to_audio_files_singular_feminine',
                'links_to_audio_files_plural_masculine',
                'links_to_audio_files_plural_feminine',
                'english_translations',
                'french_translations',
                'italian_translations',
                'german_translations'
            ]
        }
    } as const;

    try {
        const { data, error } = await supabase
            .from(CONFIG.DATABASE.TABLE)
            .select(CONFIG.DATABASE.FIELDS.join(','));

        if (error) {
            console.error(chalk.red("❌ failed to fetch data from supabase:", error.message));
            return [];
        }

        if (!data || data.length === 0) {
            console.log(chalk.red("❌ no data found in supabase, exiting..."));
            return [];
        }

        console.log(`${chalk.green("✅", data.length, "words found")}`)
        return data as Adjectives;

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
    return []
}
