import "dotenv/config";
import chalk from "chalk";
import {createClient} from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function checkingSupabase(adjective: Adjective) {
  console.log(`${chalk.white("\n💡 checking supabase")}`);

  try {
    const {data, error} = await supabase
      .from("spanish_adjectives")
      .select("id")
      .eq("singular_masculine", adjective.singular_masculine);

    if (data && data.length > 0) {
      return true;
    } else {
      console.log(
        `✅ ${chalk.green(adjective.singular_masculine, "does not exist on supabase, proceeding...")}`,
      );
      return false;
    }
  } catch (error) {
    console.log(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
  }
}
