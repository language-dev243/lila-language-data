import "dotenv/config";
// import { createClient } from '@supabase/supabase-js';

import { askToContinue } from "./askToContinue";
import { readingCSV } from "./readingCSV";
import { checkingWiktionary } from "./checkingWiktionary";
import { fetchingInflections } from "./fetchingInflections";
import { fetchingIPA } from "./fetchingIPA";
import { fetchingSyllabifications } from "./fetchingSyllabifications";
import { fetchingTranslations } from "./fetchingTranslations";
import { writingToCSV } from "./writingToCSV";

// const SUPABASE_URL = process.env.SUPABASE_URL!;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {

  console.log("it's starting now...\n")

  //todo: sort word by category

  const word = {
    "singular_masculine": "",
    "singular_feminine": "",
    "plural_masculine": "",
    "plural_feminine": "",
    "ipa_singular_masculine": "",
    "ipa_singular_feminine": "",
    "ipa_plural_masculine": "",
    "ipa_plural_feminine": "",
    "syllabification_singular_masculine": "",
    "syllable_count_singular_masculine": "",
    "syllabification_singular_feminine": "",
    "syllable_count_singular_feminine": "",
    "syllabification_plural_masculine": "",
    "syllable_count_plural_masculine": "",
    "syllabification_plural_feminine": "",
    "syllable_count_plural_feminine": "",
    "links_to_audio_files_singular_masculine": [],
    "links_to_audio_files_singular_feminine": [],
    "links_to_audio_files_plural_masculine": [],
    "links_to_audio_files_plural_feminine": [],
    "english_translations": [],
    "french_translations": [],
    "italian_translations": [],
    "german_translations": []
  }

  try {
    // step 1: reading adjective from source csv
    word.singular_masculine = await readingCSV();
    // await askToContinue()

    // step 2: checking if word is on wiktionary
    await checkingWiktionary(word.singular_masculine);
    // await askToContinue()

    // step 3: fetching inflections of word from wiktionary
    await fetchingInflections(word)
    // await askToContinue()

    // step 4: fetching IPA of word from wiktionary
    await fetchingIPA(word)
    // await askToContinue()

    // step 5: fetching syllabifications from wiktionary
    await fetchingSyllabifications(word)
    await askToContinue()

    // step 6: fetching translations
    await fetchingTranslations(word)
    await askToContinue()

    console.log("\n currently word looks like this: ", word)

  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}

main();