import axios from "axios"

export async function checkingWiktionary(word) {
    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word)}`

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }

    return false;
  }