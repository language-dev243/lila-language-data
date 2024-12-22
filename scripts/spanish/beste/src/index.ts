import "dotenv/config";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);


async function testConnection() {
  try {
      const { data, error } = await supabase.from('spanish_adjectives').select('*').limit(1);
      
      if (error) {
          console.error("Error testing connection:", error.message);
      } else {
          console.log("Connection successful. Sample data:", data);
      }
  } catch (err) {
      console.error("Unexpected error:", err.message);
  }
}

testConnection();