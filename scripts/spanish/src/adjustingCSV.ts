import fs from "fs/promises";
import Papa from "papaparse";

async function transformCSV() {

    const sourceFilePath = "./data/sources/adjectives.csv"
    const targetFilePath = "./data/sources/adjectives_transformed.csv"

    try {

        const sourceData = await fs.readFile(sourceFilePath, "utf8");

        const parsedData = Papa.parse(sourceData, {
            header: true,
            skipEmptyLines: true,
        });

        const transformedData = parsedData.data.map((row) => ({
            word: row.word,
        }));

        const updatedCSV = Papa.unparse(transformedData, {
            header: true,
        });

        await fs.writeFile(targetFilePath, updatedCSV, "utf8");

        console.log("✅ Transformation complete!");
        console.log("Output written to:", targetFilePath);
    } catch (error) {
        console.log("❌ Error:", error.message);
    }
}

transformCSV();