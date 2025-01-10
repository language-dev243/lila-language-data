import axios from "axios";
import * as cheerio from 'cheerio';
import chalk from "chalk";

export async function fetchingIPA(adjective: SpanishAdjective, sourceFilePath: FilePath) {

  console.log("💡 fetching IPA...")

  /// todo: andere loop schreiben, besser durchs objekt iterieren

  try {



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