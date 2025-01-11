import axios from "axios";
import * as cheerio from 'cheerio';
import chalk from "chalk";

export async function fetchingIPA(adjective: Adjective, sourceFilePath: FilePath) {

  console.log("💡 fetching IPA")

  // key of creates a union of object keys
  // pick creates a type fo the union
  type Inflections = keyof Pick<Adjective, 'singular_masculine' | 'plural_masculine' | 'singular_feminine' | 'plural_feminine'>;

  try {

    const inflections = ["singular_masculine", "plural_masculine", "singular_feminine", "plural_feminine"]

    for (const inflection of inflections) {
      const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(adjective[inflection])}`;
      console.log(`Fetching IPA for ${inflection}: ${url}`);
    }





  } catch (error) {
    console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    return
  }
}







/*


const inflections = ["singular_masculine", "plural_masculine", "singular_feminine", "plural_feminine"]

for (const inflection of inflections) {

  const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(
    `adjective.${inflection}`
  )}`;

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const dataTable = $(".pron-graf");

  if (dataTable.length > 0) {
    let ipa = dataTable.find("tr:nth-child(2) td:nth-child(2)").text().trim();
    ipa = ipa.replace(/].*$/, "]").trim();
    ipa = ipa.replace(/[\[\]]/g, "").trim();

    `adjective.ipa_${inflection}` = ipa;

  } else {
    console.log(`${chalk.red("❌ no IPA found for ", inflection, " exiting...")}`);
    return
  }
}

console.log(`${chalk.green("✅ IPA found")}`);


*/