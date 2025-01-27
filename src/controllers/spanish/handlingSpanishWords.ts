export async function handlingSpanishWords() {
  console.log("hello from handlingSpanishWords");
}

// step x: check if word exists in wiktionary
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
