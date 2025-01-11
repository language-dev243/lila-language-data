import chalk from "chalk";
import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchingIPA(adjective: Adjective, sourceFilePath: FilePath): Promise<boolean> {
  console.log(`💡 Fetching IPA for: ${adjective.singular_masculine}`);

  try {
    const inflections: AdjectiveInflectionsUnion[] = ['singular_masculine', 'plural_masculine', 'singular_feminine', 'plural_feminine'];

    for (const inflection of inflections) {

      const inflectionValue = adjective[inflection];

      const url = `https://es.m.wiktionary.org/wiki/${encodeURIComponent(inflectionValue)}`;

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const dataTable = $(".pron-graf");

      if (dataTable.length > 0) {
        let ipa = dataTable.find("tr:nth-child(2) td:nth-child(2)").text().trim();
        ipa = ipa.replace(/].*$/, "]").trim();
        ipa = ipa.replace(/[\[\]]/g, "").trim();

        const ipaKey = `ipa_${inflection}` as AdjectiveIPAUnion;
        adjective[ipaKey] = ipa;

        console.log(`${chalk.green("✅ IPA found for:", inflection)}`, ipa);
      } else {
        console.log(`${chalk.red("❌ No IPA found for:", inflectionValue)}`);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.log(`${chalk.red("Unexpected error while fetching IPA:", (error as Error).message)}`);
    return false;
  }
}
