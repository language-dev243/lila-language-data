declare global {

    type ProcessedWords = string[]

    type ProcessedWordsCount = number

    type FilePath = string;

    interface Adjective {
        singular_masculine: string;
        singular_feminine: string;
        plural_masculine: string;
        plural_feminine: string;
        ipa_singular_masculine: string;
        ipa_singular_feminine: string;
        ipa_plural_masculine: string;
        ipa_plural_feminine: string;
        syllabification_singular_masculine: string;
        syllable_count_singular_masculine: string;
        syllabification_singular_feminine: string;
        syllable_count_singular_feminine: string;
        syllabification_plural_masculine: string;
        syllable_count_plural_masculine: string;
        syllabification_plural_feminine: string;
        syllable_count_plural_feminine: string;
        links_to_audio_files_singular_masculine: string[];
        links_to_audio_files_singular_feminine: string[];
        links_to_audio_files_plural_masculine: string[];
        links_to_audio_files_plural_feminine: string[];
        english_translations: string[];
        french_translations: string[];
        italian_translations: string[];
        german_translations: string[];
    }

    type Adjectives = Adjective[]

    type Word = string;

    type Words = Word[]

}

export { };