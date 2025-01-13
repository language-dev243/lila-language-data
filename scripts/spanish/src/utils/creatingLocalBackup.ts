import fs from "fs/promises";
import chalk from "chalk";

export async function creatingLocalBackup(supabaseData: Adjectives) {

    console.log(`${chalk.white("💡 creating local backup")}`)

    const filePath: FilePath = "./data/wordsInSupabase.json"
    const backupFilePath: FilePath = "./data/backups/supabase"

    // creating backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await fs.copyFile(filePath, `${backupFilePath}.${timestamp}.backup`);

    try {
        await fs.writeFile(filePath, JSON.stringify(supabaseData, null, 2),
            "utf8")
    } catch (error) {
        console.log(`${chalk.red("Unexpected error:", (error as Error).message)}\n`)
    }
    console.log(chalk.green("✅ local backup saved successfully\n"));
}