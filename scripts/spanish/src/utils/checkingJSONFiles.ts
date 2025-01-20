import chalk from "chalk";

import {readingSourceFile} from "./readingJSONFile";

export async function checkingJSONFiles() {
  const filePaths: FilePath[] = ["./data/processed/wordsInSupabase.json"];

  console.log("💡 checking local database");

  try {
    for (const filePath of filePaths) {
      const wordsArray: Adjectives = await readingJSONFile(filePath);

      if (wordsArray.length > 0) {
        wordsArray.includes(adjective) ? true : false;
      } else {
        return true;
      }
    }
  } catch (error) {
    console.log(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
  }
}
