import chalk from "chalk";
import inquirer from "inquirer";
import { createProject } from "../utils/fileOperations";

export default function newCli(project?: string) {
  if (project !== undefined) {
    createProject(project, false);
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
      {
        type: "list",
        name: "install",
        message: "Install dependancies?",
        choices: [
          { name: "Yes", value: "yes" },
          { name: "No", value: "no" },
        ],
        default: "yes",
      },
    ])
    .then(({ projectName, install }) => {
      createProject(projectName, install === "yes");
    });
}
