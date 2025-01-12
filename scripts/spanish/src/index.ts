import chalk from "chalk"

import { syncLocalWithSupabase } from "./utils/syncLocalWithSupabase";
import { readingSourceFile } from "./utils/readingSourceFile";
import { handlingAdjectives } from "./handlingAdjectives";

async function main() {


    try {
        // sync the local json database with supabase
        await syncLocalWithSupabase()

        // reading from the source json
        // const words: Words = await readingSourceFile()

        // processing adjectives
        // await handlingAdjectives(words)

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}

main();
