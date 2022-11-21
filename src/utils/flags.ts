import chalk from "chalk";
import { Flag } from "../types";
import table from "./createTable";

const optionsTable = table();
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
export function flagOptions() {
  let flag = `${chalk.bgHex("#ff9248").hex("#1e1d40").bold(" OPTIONS ")} \n\n`;

  flags.forEach((f) => {
    let flagLeft = "";
    flagLeft += `${chalk.hex("#ff9248")("--" + f.name)}`;

    if (f.alias) {
      flagLeft += `${chalk.hex("#ff9248")(", -" + f.alias)}`;
    }

    optionsTable.push([flagLeft, `  ${chalk.white(f.description)}`]);
  });

  flag += optionsTable.toString();

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
