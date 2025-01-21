import chalk from "chalk";

async function main() {
  try {
    console.log(`${chalk.green("hello world")}\n`);
  } catch (error) {
    console.log(
      `${chalk.red("Unexpected error:", (error as Error).message)}\n`,
    );
  }
}

main();
