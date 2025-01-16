import "dotenv/config";
import { createClient } from '@supabase/supabase-js';
import chalk from "chalk";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function uploadingToSupabase(adjective: Adjective) {

    try {

        const wordData = {
            singular_masculine: adjective.singular_masculine,
            singular_feminine: adjective.singular_feminine,
            plural_masculine: adjective.plural_masculine,
            plural_feminine: adjective.plural_feminine,
            ipa_singular_masculine: adjective.ipa_singular_masculine,
            ipa_singular_feminine: adjective.ipa_singular_feminine,
            ipa_plural_masculine: adjective.ipa_plural_masculine,
            ipa_plural_feminine: adjective.ipa_plural_feminine,
            syllabification_singular_masculine: adjective.syllabification_singular_masculine,
            syllable_count_singular_masculine: adjective.syllable_count_singular_masculine,
            syllabification_singular_feminine: adjective.syllabification_singular_feminine,
            syllable_count_singular_feminine: adjective.syllable_count_singular_feminine,
            syllabification_plural_masculine: adjective.syllabification_plural_masculine,
            syllable_count_plural_masculine: adjective.syllable_count_plural_masculine,
            syllabification_plural_feminine: adjective.syllabification_plural_feminine,
            syllable_count_plural_feminine: adjective.syllable_count_plural_feminine,
            links_to_audio_files_singular_masculine: [],
            links_to_audio_files_singular_feminine: [],
            links_to_audio_files_plural_masculine: [],
            links_to_audio_files_plural_feminine: [],
            english_translations: adjective.english_translations,
            french_translations: adjective.french_translations,
            italian_translations: adjective.italian_translations,
            german_translations: adjective.german_translations
        };

        const { data, error } = await supabase
            .from('spanish_adjectives')
            .insert(wordData);

        if (error) {
            throw new Error(`Error inserting word: ${error.message}`);
        }

        console.log(`${chalk.green("✅ uploaded successfully to supabase")}`);

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}
