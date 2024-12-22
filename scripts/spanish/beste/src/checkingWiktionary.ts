import axios from "axios"

export async function checkingWiktionary(adjectives) {
  const adjectivesInWiktionary = [];
  const adjectivesNotInWiktionary = [];

  for (const adjective of adjectives) {
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      adjective.adjective_singular_masculine
    )}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        adjectivesInWiktionary.push(adjective);
      } else {
        adjectivesNotInWiktionary.push(adjective);
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  }

  console.log("adjectives in wiktionary: ",adjectivesInWiktionary)
  console.log("adjectives NOT in wiktionary: ",adjectivesNotInWiktionary)
}