import { fileURLToPath } from "node:url";
import path from "path";

import ncp from "ncp";
import { promisify } from "util";
import { projectInstall } from "pkg-install";
import fs from "@supercharge/filesystem";
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

async function updateJson(name: string) {
  const PkgJson = JSON.parse(
    await fs.readFile(path.join(process.cwd(), name, "package.json"))
  );

  PkgJson.name = name.toLowerCase();

  //set bin entries
  PkgJson.bin = {};

  PkgJson.bin[`@yourname/${name.toLowerCase()}`] = "bin/index.js";
  PkgJson.bin[`${name.toLowerCase()}`] = "bin/index.js";

  //set keywords
  PkgJson.keywords = [name.toLowerCase()];

  await fs.writeFile(
    path.join(process.cwd(), name, "package.json"),
    JSON.stringify(PkgJson),
    {
      encoding: "utf8",
    }
  );

  return true;
}

async function updateReadme(name: string) {
  const README = await fs.readFile(path.join(process.cwd(), name, "README.md"));
  await fs.writeFile(
    path.join(process.cwd(), name, "README.md"),
    README.replaceAll("[cli-name]", name),
    {
      encoding: "utf8",
    }
  );

  return true;
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
    {
      title: "Updating package.json...",
      task: () => updateJson(name),
    },
    {
      title: "Updating README.md...",
      task: () => updateReadme(name),
    },
  ]);

  try {
    await tasks.run();

    if (!install) {
      console.log();
      console.log(chalk.green.bold(`cd ${name} && npm install`));
      console.log();
    } else {
      console.log("%s Project ready", chalk.green.bold("DONE"));
      console.log();
      console.log(chalk.green.bold(`cd ${name} && npm run dev`));
      console.log();
    }
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"));
  }
}
