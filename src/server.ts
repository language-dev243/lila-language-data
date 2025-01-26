import chalk from "chalk";

async function main() {
  try {
    console.log("hello world");

    // step 1: reading source file => wordsFromSource array
    // what if file not exists
    // what if file is empty
    // what if file contains no array
    // what if file contains an array not only containing strings
    // what if file contains an array of 303004040 strings

    // step 2: determine language via libretranslate
    // and put the words in their corresponding arrays, e.g. newEnglishWords, newSpanishWords etc
    // store all detected languages in a variable for step 3

    // step 3: reading database (only the languages detected in step 2)
    // and put the words in their corresponding arrays, e.g. englishWordsInDatabase, spanishWordsInDatabase etc

    // step 4: compare wordsFromSource and wordsInDatabase
    // the words that are not in the database get further processed

    // step 5: check if word exists in wiktionary
    // if not, it gets saved in database
    // if exists go to next step

    // step 6: determine word category from wiktionary
    // if no word categroy is found, it gets saved in database
    // if the category is found, send the word to the corresponding function, e.g. handlingSpanishAdjectives, handlingGermanNounds
    // these functions handle everything specific to the categroy, e.g. singular/plural, inflections

    // step 6: check if ipa exist in wiktionary
    // if not, it gets save in database
    // if exists go to next step

    // step 7: check if syllabification exist in wiktionary
    // if not, it gets save in database table words without syllabification
    // if exists go to next step

    // step 8: get translations from self hosted libre translate
    // if not all translations are found, save them in the database

    // step 9: save the processed words to the database

    // step 10: console.log summary
    // how many processed words, what languages
    // how many succesfully written, how many have not all atributes etc
  } catch (error) {
    console.error(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
  }
}

main();
