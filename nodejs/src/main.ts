import readline from "readline";
import { Lexer } from "./lexer.js";

const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("¡Esta es una calculadora!");
inquirer.question(">>", (input) => {
    if (input === "q") {
        inquirer.close();
    }
    try {
        const lexer = new Lexer(input);
        lexer.getTokens();
        console.log(`>> ${input} - ${lexer.stringify()}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(`${err.name}: ${err.message}`);
        } else {
            console.log(err);
        }
    }
    inquirer.close();
});

inquirer.on("close", function () {
    console.log("Good bye!");
    process.exit(0);
});
