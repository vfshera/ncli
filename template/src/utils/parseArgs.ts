import arg from "arg";
import chalk from "chalk";
import logSymbols from "log-symbols";

import { mapCommands } from "./commands";
import { mapFlags } from "./flags";

const ARG_ERRORS = [
  "ARG_CONFIG_NONOPT_KEY",
  "ARG_UNKNOWN_OPTION",
  "INVALID_COMMANDS",
];

function handleError(err: any) {
  if (ARG_ERRORS.includes(err.code)) {
    console.log(logSymbols.error, chalk.red(err.message), "\n");
  } else {
    throw err;
  }

  process.exit(1);
}

function handleInvalidCommands(cmds: string[]) {
  const invalidCommands = cmds.filter((ar) => !mapCommands().includes(ar));

  if (invalidCommands.length > 0) {
    const myError: CustomError = {
      code: "INVALID_COMMANDS",
      message: "invalid commands: " + invalidCommands.join(","),
    };

    handleError(myError);
  }
}

export default function parseArgs(rawArgs: Args): Options {
  let cliArgs = {
    help: false,
  };

  try {
    const args = arg(mapFlags(), {
      argv: rawArgs.slice(2),
    });

    const commandList: any = {};

    handleInvalidCommands(args._);

    mapCommands().forEach((com) => (commandList[com] = args._.includes(com)));

    cliArgs = {
      ...cliArgs,
      help: args["--help"] || false,
      ...commandList,
    };
  } catch (err: any) {
    process.on("uncaughtException", () => handleError(err));
    process.on("unhandledRejection", () => handleError(err));

    handleError(err);
  }

  return cliArgs;
}
