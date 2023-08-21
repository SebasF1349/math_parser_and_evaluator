import readline from "readline";

const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("¡Esta es una calculadora!");
inquirer.question(">>", (input) => {
    if (input === "q") {
        inquirer.close();
    }
    console.log(`>> ${input}`);
    inquirer.close();
});

inquirer.on("close", function () {
    console.log("Good bye!");
    process.exit(0);
});
