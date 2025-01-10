import chalk from "chalk";

export async function deletingFromJSONFiles() {
    try {

    }
    catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
}
