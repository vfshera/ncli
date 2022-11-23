import chalk from "chalk";
import table from "./createTable";

const cmdTable = table();

// decare commands
export const commands: Command[] = [
  {
    name: "new",
    description: "generate new cli",
  },
];

//generates options for help commands
export function cmdOptions() {
  let commandString = `${chalk
    .hex("#1e1d40")
    .bgHex("#0087d8")
    .bold(" COMMANDS ")} \n\n`;

  commands.forEach((c) => {
    cmdTable.push([
      `${chalk.hex("#0087d8")(c.name)}`,
      `  ${chalk.white(c.description)}`,
    ]);
  });

  commandString += cmdTable.toString();

  return commandString + "\n";
}

//generate our commands
export function mapCommands(): string[] {
  return commands.map((comm) => comm.name);
}
