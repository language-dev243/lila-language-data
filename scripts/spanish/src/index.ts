import chalk from "chalk"

import { syncLocalWithSupabase } from "./utils/syncLocalWithSupabase";
import { readingSourceFile } from "./utils/readingSourceFile";
import { handlingAdjective } from "./adjectives/handlingAdjective";

async function main() {

    try {
        // sync the local json database with supabase
        // todo: create jsons for all word categories
        await syncLocalWithSupabase()

        // getting new words from the source json
        const words: Words = await readingSourceFile()

        // todo: loop through the new words and 
        // pass them to to correspondending functions
        // adjectives to handling adjectives function

        for (const word of words) {


            await handlingAdjective(word)
        }

    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}

main();
