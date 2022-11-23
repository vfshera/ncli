import chalk from "chalk";
import table from "./createTable";

const optionsTable = table();
// decare flags
export const flags: Flag[] = [
  {
    name: "help",
    alias: "h",
    description: "cli help",
    type: Boolean,
  },
  {
    name: "new-cli",
    alias: "n",
    description: "make new cli",
    type: String,
    option: "cli name",
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
export function mapFlags() {
  let cliFlags: any = {};

  flags.forEach((f) => {
    let flagName = "--" + f.name;
    cliFlags[flagName] = f.type;
    if (f.alias) {
      cliFlags["-" + f.alias] = flagName;
    }
  });

  return cliFlags;
}
