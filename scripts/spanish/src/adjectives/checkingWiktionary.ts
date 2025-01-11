import axios from "axios"
import chalk from "chalk"

export async function checkingWiktionary(adjective: Adjective) {

  console.log("💡 checking wiktionary...")

  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
    adjective.singular_masculine)}`

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log(`${chalk.green("✅ ", adjective.singular_masculine, " found in wiktionary")}`)
      return true;
    }
  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
  }
  return false;
}