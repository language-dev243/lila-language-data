import chalk from "chalk";

async function main() {
  try {
    console.log("hello world");
    // step 1: reading source file => wordsFromSource
    // step 2: reading database => wordsInDatabase
    // step 3: compare wordsFromSource and wordsInDatabase, the words that are not in the database get further processed
    // step 4: check if word exists in wiktionary, if not, it gets saved in database table words not in wiktionary, if exists go to next step
    // step 6: check if inflections exist in wiktionary, if not, it gets save in database table words without inflections, if exists go to next step
    // step 6: check if ipa exist in wiktionary, if not, it gets save in database table words without ipa, if exists go to next step
    // step 7: check if syllabification exist in wiktionary, if not, it gets save in database table words without syllabification, if exists go to next step
    // step 8: get translations from self hosted libre translate
    // step 9: save the processed words to the database
  } catch (error) {
    console.error(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
  }
}

main();
