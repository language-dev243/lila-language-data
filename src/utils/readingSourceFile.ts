import fs from "fs/promises";
import chalk from "chalk";

export async function readingSourceFile(): Promise<Words> {
  console.log(`${chalk.white("💡 reading new words")}`);

  const filePath: FilePath = "data/source.json";
  let words: Words = [];

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const parsedData = JSON.parse(fileContent) as Words;

    if (!Array.isArray(parsedData) || parsedData.length === 0) {
      console.warn(
        `${chalk.red("❌ json file is empty or has no data rows")}\n`,
      );
      return [];
    }

    words = parsedData as Words;
    console.log(
      `${chalk.green("✅", words.length, "words found in source file\n")}`,
    );
  } catch (error) {
    console.error(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
    throw error;
  }

  return words;
}
