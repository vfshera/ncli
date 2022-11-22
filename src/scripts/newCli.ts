import chalk from "chalk";
import inquirer from "inquirer";
import { createProject } from "../utils/fileOperations";

export default function newCli(project?: string) {
  if (project !== undefined) {
    createProject(project);
    return;
  }

  inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "What should we call the cli?",
        default: "new-cli",
      },
    ])
    .then((answers) => {
      createProject(answers.projectName);
    });
}
