import readline from "readline";
import process from "process";

export function dontCloseMe() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("", () => {
        console.log("Bye Bye !");
        rl.close();
    });

}
