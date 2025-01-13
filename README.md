# lila-language-data

- [lila-language-data](#lila-language-data)
  - [mvp todos](#mvp-todos)
    - [checking against csvs](#checking-against-csvs)
    - [switching to json and ts](#switching-to-json-and-ts)
    - [fix fetching ipa](#fix-fetching-ipa)
    - [fix fetching inflections](#fix-fetching-inflections)
    - [fix fetching syllabifications](#fix-fetching-syllabifications)
    - [incorporate libretranslate](#incorporate-libretranslate)
    - [incorporate mozilla text-to-speech](#incorporate-mozilla-text-to-speech)
  - [notes](#notes)
---

## mvp todos

### checking against csvs
- [x] ensure that the words read from the source csv are checked against the data csvs before any further processing steps

### switching to json and ts
- [ ] add function to pull all the data from supabase and create a local json copy
- [ ] convert the exisiting word data from csv files to json files
- [ ] ensure that the words read from the source json file are checked against the data json files before any further processing steps
- [ ] set up and enforce typeScript in the project to ensure type safety and maintainability

### fix fetching ipa
- fix the process for fetching ipa representations for words

- possible sources:
- 1. Forvo

    What it is: Forvo is a community-driven website with audio recordings and IPA transcriptions for words in various languages, including Spanish.
    How to use: Forvo has a free website and offers IPA transcriptions for a vast number of words in Spanish.
    API: Forvo has a paid API, but you can explore its API documentation to see if it fits your needs. It might be useful if you need large-scale access or integration into your app.
    Web scraping: If you don't want to pay for the API, you could scrape the IPA data from the website, but make sure to follow their terms of service.

2. SpanishDict

    What it is: SpanishDict is a popular site that offers translations, conjugations, and pronunciation in Spanish, along with IPA transcriptions for many words.
    How to use: They provide IPA for individual words, and the site is generally very accurate.
    API: SpanishDict doesn’t have a public API, but it has a huge dictionary and pronunciation resources that can be scraped. You can consider scraping the IPA transcription along with the word pronunciation if it aligns with their terms of service.

3. Wiktionary

    What it is: Wiktionary contains entries for Spanish words and often provides IPA transcriptions. It's a collaborative project, so it has a large database of transcriptions for many Spanish adjectives.
    How to use: You can access the IPA transcriptions by looking at the Spanish word pages.
    API: There is no official API for Wiktionary, but you can use the Wikimedia API to scrape Wiktionary entries (with some restrictions). You can query specific pages like https://en.wiktionary.org/wiki/{word} for IPA transcriptions.
    Web scraping: Scraping the IPA transcriptions from Wiktionary is feasible, as long as you respect their terms of use.

4. IPA Source

    What it is: IPA Source is a valuable resource for finding phonetic transcriptions for a variety of languages, including Spanish. While it's more focused on musical texts, it could provide a reliable base for words or phrases.
    How to use: You can browse the transcriptions directly on the website.
    API: IPA Source does not offer an API, and scraping may be limited in some cases.

5. Linguee

    What it is: Linguee is an online dictionary that combines machine translations with human translations. It also shows phonetic transcriptions for many Spanish words, although not all of them.
    How to use: You can check individual entries for IPA transcriptions.
    API: Linguee does not provide a public API, but you can still scrape data if it's permissible.

6. Google Translate

    What it is: Google Translate offers IPA-like transcriptions for many languages, including Spanish.
    How to use: You can translate words and find the IPA in the phonetic text format (though it's not always exactly IPA).
    API: Google Cloud Translation API is available, but it’s a paid service. It could be useful if you need reliable translations and pronunciation, though IPA may not be directly available via the API.

7. Glosbe

    What it is: Glosbe is a multilingual dictionary and translation platform. It may provide IPA transcriptions for many words, especially in commonly spoken languages like Spanish.
    How to use: You can search for individual words, and IPA transcriptions may be available in the results.
    API: Glosbe provides an open API that can be used to fetch translations and sometimes phonetic transcriptions for words. It's free but requires registration.

Summary:

    Best free option: Forvo is a great resource for IPA transcriptions, especially if you need accuracy for common words. It provides an API with some limitations but is a premium service.
    Alternative for scraping: Wiktionary offers IPA transcriptions and can be scraped with caution, but make sure to comply with their terms.
    Free API options: Glosbe has a free API that can be explored, and you might find IPA transcriptions for Spanish words there.

Let me know if you'd like more detailed instructions on how to scrape or use these services!

### fix fetching inflections
- address issues related to fetching inflection forms of words

### fix fetching syllabifications
- resolve any problems with the syllabification data retrieval for words

### incorporate libretranslate
- integrate libretranslate for translation functionality, and use freedict as a fallback translation source (with downloadable data sets)

### incorporate mozilla text-to-speech
- add mozilla tts functionality to generate speech from text
- research webspace for storing audio files
- generate and save audio files

## notes
- add own oss license + add wiktionary license (see their eula)
- add testing
- adjust CD/CI process (add linting and automatic testing)
- get rid of (all) dependencies
- create nice readme file
- add column "language level", find source for levels (a1-c2), adjust database data
- add all other word categories
- fill the database with words
- create decks object + generate decks (100 beginner words, song from manu chao, etc)
