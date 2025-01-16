import chalk from "chalk"

import { syncLocalWithSupabase } from "./utils/syncLocalWithSupabase";
import { readingSourceFile } from "./utils/readingSourceFile";
import { handlingAdjective } from "./controllers/adjectives/handlingAdjective";

async function main() {

    try {
        // sync the local json database with supabase
        // todo: create jsons for all word categories
        await syncLocalWithSupabase()

        // getting new words from the source json
        const words: Words = await readingSourceFile()

        // compare local supabase with the new words in source json
        // if there are new words remaining, pass them to to correspondending functions
        // like: adjectives to handling adjectives function
        await handlingAdjective(word)


    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}

main();

