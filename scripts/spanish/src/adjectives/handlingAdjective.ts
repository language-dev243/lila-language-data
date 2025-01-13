import chalk from "chalk";

import { checkingAgainstDatabase } from "../utils/checkingAgainstDatabase"
import { checkingWiktionary } from "./checkingWiktionary";
import { fetchingInflections } from "./fetchingInflections";
import { fetchingIPA } from "./fetchingIPA";
import { fetchingSyllabifications } from "./fetchingSyllabifications";
import { fetchingTranslations } from "./fetchingTranslations";
import { uploadingToSupabase } from "./uploadingToSupabase";

export async function handlingAdjective(word: Word) {

  try {

    console.log(`${chalk.white("\n💡 processing adjective: ", word)}`)

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

    // setting the adjective
    adjective.singular_masculine = word;

    // checking against adjective database
    const existsInDatabase = await checkingAgainstDatabase(adjective)
    if (existsInDatabase) {
      console.log(`${chalk.yellow("⚠️ ", adjective.singular_masculine, " already exists in database\n⚠️ proceeding to next word\n")}`)
      return
    } else {
      return false
    }
    // todo: add else to save to adjectives not in db.json

    // checking if word is on wiktionary
    const isInWiktionary = await checkingWiktionary(adjective);
    if (!isInWiktionary) {
      console.log(`${chalk.red("❌ ", adjective.singular_masculine, " not found in wiktionary, exiting...\n")}`)
      return;
    } else {
      return false
    }
    // todo: add else to save to adjectives not in wiktionary.json

    // fetching inflections of word from wiktionary
    const inflectionsFound = await fetchingInflections(adjective)
    if (!inflectionsFound) {
      console.log(`${chalk.red("❌ no inflections found for ", adjective.singular_masculine, ", exiting...\n")}`)
      return;
    } else {
      return false
    }
    // todo: add else to save to adjectives missing inflections .json

    // fetching IPA of word from wiktionary
    const foundIPA = await fetchingIPA(adjective)
    if (!foundIPA) {
      console.log(`${chalk.red("❌ couldnt find all IPAs, exiting...\n")}`)
      return;
    } else {
      return false
    }
    // todo: add else to save to adjectives missing IPA .json

    // todo: add missing functions: syllabifications, translations, see bottom comment

    console.log(`${chalk.red("\n💡 done and gone")}`)

  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
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