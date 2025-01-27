import chalk from "chalk";

import {readingSourceFile} from "@utils/readingSourceFile";
import {detectingLanguages} from "@utils/detectingLanguages";
import {checkingDatabase} from "@utils/checkingDatabase";
import {handlingEnglishWords} from "@controllers/english/handlingEnglishWords";
import {handlingFrenchWords} from "@controllers/french/handlingFrenchWords";
import {handlingGermanWords} from "@controllers/german/handlingGermanWords";
import {handlingItalianWords} from "@controllers/italian/handlingItalianWords";
import {handlingSpanishWords} from "@controllers/spanish/handlingSpanishWords";

async function main() {
  try {
    console.log(`${chalk.blue("💡 starting word processing pipeline\n")}`);
    // console.log(`${chalk.green("✅ words found")}`);
    // console.log(`${chalk.red("❌ json file is empty or has no data rows")}`);

    // step 1: reading source file
    // return array of strings
    await readingSourceFile();

    // step 2: determine languages via libretranslate
    // save words and corresponding languages into newWordsObject
    // and return newWordsObject
    await detectingLanguages();

    // step x: check database against newWordsObject
    // and return newWordsObject without the words that are already in the db
    // newWordsObject will look like this
    // newWordsObject = {
    //   english: ["red"],
    //   spanish: ["rojo", "grande"]
    // }
    await checkingDatabase();

    // need help here with how to iterate here
    // if newWordsObject has english key with values then
    // give the values to the handlingEnglishWords function
    // same for every other possilbe key
    // the supported languages will be: english, spanish, frensch, italian, german
    await handlingEnglishWords();
    await handlingFrenchWords();
    await handlingGermanWords();
    await handlingItalianWords();
    await handlingSpanishWords();
  } catch (error) {
    console.error(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
  }
}

main();
