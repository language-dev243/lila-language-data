import fs from "fs/promises";
import Papa from "papaparse";

export async function writingToCSV(word) {

  console.log("💡 step 7: reading to CSV...")

  const sourceFilePath = "./data/test.csv";
  const targetFilePath = "./data/readyToUpload.csv";

  try {

    const sourceData = await fs.readFile(sourceFilePath, "utf8");

    const newRow = {
      singular_masculine: word.singular_masculine,
      singular_feminine: word.singular_feminine,
      plural_masculine: word.plural_masculine,
      plural_feminine: word.plural_feminine,
      ipa_singular_masculine: word.ipa_singular_masculine,
      ipa_singular_feminine: word.ipa_singular_feminine,
      ipa_plural_masculine: word.ipa_plural_masculine,
      ipa_plural_feminine: word.ipa_plural_feminine,
      syllabification_singular_masculine: word.syllabification_singular_masculine,
      syllable_count_singular_masculine: word.syllable_count_singular_masculine,
      syllabification_singular_feminine: word.syllabification_singular_feminine,
      syllable_count_singular_feminine: word.syllable_count_singular_feminine,
      syllabification_plural_masculine: word.syllabification_plural_masculine,
      syllable_count_plural_masculine: word.syllable_count_plural_masculine,
      syllabification_plural_feminine: word.syllabification_plural_feminine,
      syllable_count_plural_feminine: word.syllable_count_plural_feminine,
      links_to_audio_files_singular_masculine: word.links_to_audio_files_singular_masculine.join(","),
      links_to_audio_files_singular_feminine: word.links_to_audio_files_singular_feminine.join(","),
      links_to_audio_files_plural_masculine: word.links_to_audio_files_plural_masculine.join(","),
      links_to_audio_files_plural_feminine: word.links_to_audio_files_plural_feminine.join(","),
      english_translations: word.english_translations.join(","),
      french_translations: word.french_translations.join(","),
      italian_translations: word.italian_translations.join(","),
      german_translations: word.german_translations.join(","),
    };

    const parsedTargetData = []
    parsedTargetData.push(newRow);
    const updatedTargetData = Papa.unparse(parsedTargetData);
    await fs.writeFile(targetFilePath, updatedTargetData, "utf8");

    console.log("✅ written to csv \n");

  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}