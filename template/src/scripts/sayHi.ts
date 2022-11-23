import chalk from "chalk";
import inquirer from "inquirer";

export default function sayHi() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "usename",
        message: "What is your name?",
        default: "User",
      },
    ])
    .then(({ usename }) => {
      console.log(
        chalk.blue(
          `Hello ${usename} thanks for using make-cli for this project!`
        )
      );
    });
}
