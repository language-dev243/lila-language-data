declare global {

    type ProcessedWords = string[]

    type ProcessedWordsCount = number

    type FilePath = string;

    type FilePaths = FilePath[];

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


    // Union type for inflections
    type AdjectiveInflectionsUnion = keyof Pick<
        Adjective,
        'singular_masculine' | 'singular_feminine' | 'plural_masculine' | 'plural_feminine'
    >;

    // Union type for IPA properties
    type AdjectiveIPAUnion = keyof Pick<
        Adjective,
        'ipa_singular_masculine' | 'ipa_singular_feminine' | 'ipa_plural_masculine' | 'ipa_plural_feminine'
    >;
    type Adjectives = Adjective[]

    type Word = string;

    type Words = Word[]

}

export { };