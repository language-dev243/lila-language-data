import axios from "axios"

export async function checkingWiktionary(word) {

  console.log("💡 step 2: checking wiktionary...")

    const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
      word)}`

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log(`✅ word "${word}" found in wiktionary`)
        return true;
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }

    console.log(`❌ Word "${word}" not found in wiktionary...\n Exiting process...`);
    return false;
  }