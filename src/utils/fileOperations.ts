import chalkAnimation from "chalk-animation";
import { fileURLToPath } from "node:url";
import path from "path";

import ncp from "ncp";
import { promisify } from "util";
import { projectInstall } from "pkg-install";
import Listr from "listr";
import chalk from "chalk";

const copy = promisify(ncp);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateDir = path.resolve(__dirname, "../template");

// copy template files
async function copyTemplate(targetDir: string) {
  return copy(templateDir, targetDir, { clobber: false });
}

// install dependancies
async function installDeps(targetDir: string) {
  return projectInstall({
    cwd: targetDir,
  });
}

export async function createProject(name: string, install: boolean) {
  const destination = path.join(process.cwd(), name);

  const tasks = new Listr([
    {
      title: "Creating project...",
      task: () => copyTemplate(destination),
    },
    {
      title: "Installing dependancies...",
      skip: () => !install,
      task: () => installDeps(destination),
    },
  ]);

  try {
    await tasks.run();

    console.log("%s Project ready", chalk.green.bold("DONE"));
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"));
  }
}
