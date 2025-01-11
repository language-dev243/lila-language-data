import chalk from "chalk";

import { readingLocalJSON } from "./utils/readingLocalJSON";
import { checkingAgainstDatabase } from "./utils/checkingAgainstDatabase"
import { checkingWiktionary } from "./adjectives/checkingWiktionary";
import { fetchingInflections } from "./adjectives/fetchingInflections";
import { fetchingIPA } from "./adjectives/fetchingIPA";
import { fetchingSyllabifications } from "./adjectives/fetchingSyllabifications";
import { fetchingTranslations } from "./adjectives/fetchingTranslations";
import { uploadingToSupabase } from "./adjectives/uploadingToSupabase";

export async function handlingAdjectives(words: Words) {

  const adjective: Adjective = {
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

  // add function to update local json with supabase databae
  /*
      const existsInSupabase = await checkingSupabase(adjective)
      if (existsInSupabase) {
        console.log(`${chalk.yellow("⚠️ ", adjective.singular_masculine, " already exists in supabase, exiting...\n")}`)
        continue;
      }
      */

  const unknownAdjectives: Adjectives = []

  try {

    console.log(`${chalk.white("💡 processing adjectives")}`)

    for (const word of words) {

      // setting the adjective
      adjective.singular_masculine = word;

      // checking against adjective database
      const existsInDatabase = await checkingAgainstDatabase(adjective, unknownAdjectives)
      if (existsInDatabase) {
        console.log(`${chalk.yellow("⚠️ ", adjective.singular_masculine, " already exists in database\n⚠️ proceeding to next word\n")}`)
        continue;
      }

      // checking if word is on wiktionary
      const isInWiktionary = await checkingWiktionary(adjective);
      if (!isInWiktionary) {
        console.log(`${chalk.red("❌ ", adjective.singular_masculine, " not found in wiktionary, exiting...\n")}`)
        continue;
      }

      // fetching inflections of word from wiktionary
      const inflectionsFound = await fetchingInflections(adjective)
      if (!inflectionsFound) {
        console.log(`${chalk.red("❌ no inflections found for ", adjective.singular_masculine, ", exiting...\n")}`)
        continue;
      }

      // fetching IPA of word from wiktionary
      const foundIPA = await fetchingIPA(adjective)
      if (!foundIPA) {
        console.log(`${chalk.red("❌ couldnt find all IPAs, exiting...\n")}`)
        continue;
      }
    }

    /*
        // fetching IPA of word from wiktionary
        await fetchingIPA(adjective, sourceFilePath)
        // await askToContinue()
    
        // fetching syllabifications from wiktionary
        await fetchingSyllabifications(adjective, sourceFilePath)
        // await askToContinue()
    
        // fetching translations
        await fetchingTranslations(adjective, sourceFilePath)
        // await askToContinue()
    
        // uploading to supabase
        await uploadingToSupabase(adjective)
    
        */

    console.log(`${chalk.red("\n💡 done and gone")}`)

  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
  }
}
