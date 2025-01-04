import { askToContinue } from "./askToContinue";
import { checkingSupabase } from "./adjectives/checkingSupabase";
import { checkingWiktionary } from "./adjectives/checkingWiktionary";
import { fetchingInflections } from "./adjectives/fetchingInflections";
import { fetchingIPA } from "./adjectives/fetchingIPA";
import { fetchingSyllabifications } from "./adjectives/fetchingSyllabifications";
import { fetchingTranslations } from "./adjectives/fetchingTranslations";
import { writingToCSV } from "./writingToCSV";
import { deletingFromCSV } from "./deletingFromCSV";
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
    // step 0: setting the word
    adjective.singular_masculine = word;

    // step 1: checking if word is already in the database
    if (await checkingSupabase(word.singular_masculine)) { return }
    await askToContinue()

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
    // await askToContinue()

    // step 6: fetching translations
    await fetchingTranslations(word)
    // await askToContinue()

    // step 7: writing to csv
    await writingToCSV(word)
    // await askToContinue()

    // step 8: deleting from csv
    await deletingFromCSV(word)
    // await askToContinue()

    // step 9: uploading to supabase
    // await uploadingToSupabase(word)

  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}