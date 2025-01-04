import "dotenv/config";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function checkingSupabase(word) {

    console.log("💡 step 2:checking supabase...")


    try {

        const { data, error } = await supabase
            .from('spanish_adjectives')
            .select('id') // You can select any column, we only need 'id' to check existence
            .eq('singular_masculine', word) // Check if the 'singular_masculine' column matches the word
            .single(); // Return a single row

        if (error) {
            console.error('Error checking the database:', error);
            return false; // Return false in case of an error
        }

        return data
            ? (console.log(`${word} already exists on supabase`), true)
            : (console.log(`${word} does not exist pn supabase`), false);

    } catch (error) {
        console.error("Unexpected error:", error.message);
    }
}