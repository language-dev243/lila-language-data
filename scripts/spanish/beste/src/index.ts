import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.SUPABASE_URL!;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// const SUPABASE_URL = "https://kwmrdlleaigwnvsuvuwr.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bXJkbGxlYWlnd252c3V2dXdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDc4MzM5OCwiZXhwIjoyMDUwMzU5Mzk4fQ.nPO9T6hqFH6BRN4syom4MB7HC_2xbL6ycugLVoNe4zY"


const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Example function to insert data
async function insertData() {
  const { data, error } = await supabase
    .from('spanish_adjectives')
    .insert([
      { word_singular_masculine: 'test1' }
    ]);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', data);
  }
}

// Call the function
insertData();
