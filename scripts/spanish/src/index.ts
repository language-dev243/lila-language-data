import { readingCSV } from "./readingCSV";

import { handlingAdjectives } from "./handlingAdjectives";


async function main() {



    try {

        // step 1: reading adjective from source csv
        word.singular_masculine = await readingCSV();
        // await askToContinue()

    } catch (error) {
        console.error("Unexpected error:", error.message);
    }

}

main();