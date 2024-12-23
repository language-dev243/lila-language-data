import readline from "readline"

export function askToContinue() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "Do you want to continue with the next step? (Y/n) \n",
      (answer) => {
        rl.close();
        resolve(answer.trim().toLowerCase() === "y" || answer.trim() === "");
      }
    );
  });
}