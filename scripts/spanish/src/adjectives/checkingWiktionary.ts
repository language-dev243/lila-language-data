import axios from "axios"
import chalk from "chalk"

import { writingToCSV } from "../writingToCSV";
import { deletingFromCSV } from "../deletingFromCSV";

export async function checkingWiktionary(word, sourceFilePath) {

  console.log("💡 checking wiktionary...")

  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
    word)}`

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log(`${chalk.green("✅ ", word, " found in wiktionary")}`)
      return true;
    }
  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
    await writingToCSV(word, "./data/processed/withError/wiktionary.csv")
    await deletingFromCSV(word, sourceFilePath)
    return false;
  }

  console.log(`${chalk.red("❌ ", word, " not found in wiktionary...\n exiting process...")}`);
  await writingToCSV(word, "./data/processed/withError/wiktionary.csv")
  await deletingFromCSV(word, sourceFilePath)
  return false;
}