import { readingCSV } from "./readingCSV";

import { handlingAdjectives } from "./handlingAdjectives";


async function main() {

    try {

        // step 1: reading from source csv
        // todo: change function to read multiple words and loop through them
        const words = await readingCSV();
        // await askToContinue()

        // step 2: handle words based on category
        // case switch

        await handlingAdjectives(word)

    } catch (error) {
        console.error("Unexpected error:", error.message);
    }

}

main();