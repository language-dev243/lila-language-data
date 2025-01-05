import chalk from "chalk";

import { askToContinue } from "./askToContinue";
import { checkingSupabase } from "./adjectives/checkingSupabase";
import { checkingWiktionary } from "./adjectives/checkingWiktionary";
import { fetchingInflections } from "./adjectives/fetchingInflections";
import { fetchingIPA } from "./adjectives/fetchingIPA";
import { fetchingSyllabifications } from "./adjectives/fetchingSyllabifications";
import { fetchingTranslations } from "./adjectives/fetchingTranslations";
import { uploadingToSupabase } from "./adjectives/uploadingToSupabase";

export async function handlingAdjectives(word) {

  const adjective = {
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
    // step 0: setting the adjective
    adjective.singular_masculine = word;

    // step 1: checking if word is already in the database
    if (await checkingSupabase(adjective.singular_masculine)) { return }
    // await askToContinue()

    // step 2: checking if word is on wiktionary
    await checkingWiktionary(adjective.singular_masculine);
    // await askToContinue()

    // step 3: fetching inflections of word from wiktionary
    await fetchingInflections(adjective)
    // await askToContinue()

    // step 4: fetching IPA of word from wiktionary
    await fetchingIPA(adjective)
    // await askToContinue()

    // step 5: fetching syllabifications from wiktionary
    await fetchingSyllabifications(adjective)
    // await askToContinue()

    // step 6: fetching translations
    await fetchingTranslations(adjective)
    // await askToContinue()

    // step 7: uploading to supabase
    await uploadingToSupabase(adjective)

    return adjective

  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", error.message)}\n`)
  }
}
