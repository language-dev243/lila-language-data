import "dotenv/config";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function uploadingToSupabase(word) {
    console.log("💡 step 9: uploading to supabase...")

    try {

        const wordData = {
            singular_masculine: word.singular_masculine,
            singular_feminine: word.singular_feminine,
            plural_masculine: word.plural_masculine,
            plural_feminine: word.plural_feminine,
            ipa_singular_masculine: word.ipa_singular_masculine,
            ipa_singular_feminine: word.ipa_singular_feminine,
            ipa_plural_masculine: word.ipa_plural_masculine,
            ipa_plural_feminine: word.ipa_plural_feminine,
            syllabification_singular_masculine: word.syllabification_singular_masculine,
            syllable_count_singular_masculine: word.syllable_count_singular_masculine,
            syllabification_singular_feminine: word.syllabification_singular_feminine,
            syllable_count_singular_feminine: word.syllable_count_singular_feminine,
            syllabification_plural_masculine: word.syllabification_plural_masculine,
            syllable_count_plural_masculine: word.syllable_count_plural_masculine,
            syllabification_plural_feminine: word.syllabification_plural_feminine,
            syllable_count_plural_feminine: word.syllable_count_plural_feminine,
            links_to_audio_files_singular_masculine: [],
            links_to_audio_files_singular_feminine: [],
            links_to_audio_files_plural_masculine: [],
            links_to_audio_files_plural_feminine: [],
            english_translations: word.english_translations,
            french_translations: word.french_translations,
            italian_translations: word.italian_translations,
            german_translations: word.german_translations
        };

        const { data, error } = await supabase
            .from('spanish_adjectives')
            .insert(wordData);

        if (error) {
            throw new Error(`Error inserting word: ${error.message}`);
        }

        console.log("✅ word uploaded successfully");


    } catch (error) {
        console.error("Unexpected error:", error.message);
    }
}