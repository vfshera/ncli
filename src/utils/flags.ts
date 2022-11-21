import chalk from "chalk";
import { Flag } from "../types";
import createTable from "./createTable";

// decare flags
const flags: Flag[] = [
  {
    name: "help",
    alias: "h",
    description: "cli help",
  },
  {
    name: "update",
    description: "update the cli to the latest version",
  },
  {
    name: "install",
    alias: "i",
    description: "install the latest templates",
  },
];

//generates options for help flag
export function options() {
  let flag = `${chalk.bold("Options:")} \n\n`;

  flags.forEach((f) => {
    let flagLeft = "";
    flagLeft += `${chalk.yellow("--" + f.name)}`;

    if (f.alias) {
      flagLeft += `${chalk.yellow(", -" + f.alias)}`;
    }

    createTable.push([flagLeft, `  ${chalk.white(f.description)}`]);
  });

  flag += createTable.toString();

  return flag;
}

//generate our flags
export default function mapFlags() {
  let cliFlags: any = {};

  flags.forEach((f) => {
    let flagName = "--" + f.name;
    cliFlags[flagName] = Boolean;
    if (f.alias) {
      cliFlags["-" + f.alias] = flagName;
    }
  });

  return cliFlags;
}
