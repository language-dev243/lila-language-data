import axios from "axios";
import * as cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";

interface Word {
  id: string;
  word: string;
  partOfSpeech: string;
  english_translations: string[];
}

interface WordCategories {
  nounsMasculine: Word[];
  nounsFeminine: Word[];
  nounsBoth: Word[];
  adjectives: Word[];
  adverbs: Word[];
  prepositions: Word[];
  verbs: Word[];
}

const url =
  "https://garyhall.org.uk/language/Spanish-English-Most-Common-5000-Words-In-Alphabetical-Order.html";

async function fetchAndSaveWords(): Promise<WordCategories> {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const categories: WordCategories = {
      nounsMasculine: [],
      nounsFeminine: [],
      nounsBoth: [],
      adjectives: [],
      adverbs: [],
      prepositions: [],
      verbs: [],
    };

    $("table tr").each((index: number, element: cheerio.Element) => {
      const columns = $(element).find("td");
      if (columns.length === 3) {
        const spanishWord = $(columns[0]).text().trim();
        const partOfSpeech = $(columns[1]).text().trim();
        const englishTranslation = $(columns[2]).text().trim();

        const word: Word = {
          id: `${index}`,
          word: spanishWord,
          partOfSpeech,
          english_translations: [englishTranslation],
        };

        switch (partOfSpeech) {
          case "adj":
            categories.adjectives.push(word);
            break;
          case "adv":
            categories.adverbs.push(word);
            break;
          case "prep":
            categories.prepositions.push(word);
            break;
          case "v":
            categories.verbs.push(word);
            break;
          case "nm":
            categories.nounsMasculine.push(word);
            break;
          case "nf":
            categories.nounsFeminine.push(word);
            break;
          case "nm/f":
            categories.nounsBoth.push(word);
            break;
          default:
            break;
        }
      }
    });

    return categories;
  } catch (error) {
    console.error("Error fetching or parsing the page:", error);
    throw error;
  }
}

async function saveToCSV(words: Word[], category: string) {
  const csvWriter = createObjectCsvWriter({
    path: path.resolve(__dirname, `${category}.csv`),
    header: [
      { id: "id", title: "ID" },
      { id: "word", title: "Spanish Word" },
      { id: "english_translations", title: "English Translation" },
    ],
  });

  await csvWriter.writeRecords(
    words.map((word) => ({
      ...word,
      english_translations: word.english_translations.join(", "),
    }))
  );

  console.log(`${category} CSV file has been written successfully`);
}

async function main() {
  try {
    const wordCategories = await fetchAndSaveWords();
    console.log("Word categories:", Object.keys(wordCategories));
    console.log(`Total words: ${Object.values(wordCategories).flat().length}`);

    for (const [category, words] of Object.entries(wordCategories)) {
      console.log(`Found ${words.length} ${category}`);
      await saveToCSV(words, category);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
