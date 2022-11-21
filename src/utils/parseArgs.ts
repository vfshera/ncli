import arg from "arg";
import chalk from "chalk";
import logSymbols from "log-symbols";

import mapCommands from "./commands";
import mapFlags from "./flags";

import handleUnhandled from "cli-handle-unhandled";
const ARG_ERRORS = ["ARG_CONFIG_NONOPT_KEY", "ARG_UNKNOWN_OPTION"];

export default function parseArgs(rawArgs: Args): Options {
  let cliArgs = {
    help: false,
    new: false,
  };

  try {
    const args = arg(mapFlags(), {
      argv: rawArgs.slice(2),
    });

    const commandList: any = {};
    mapCommands().forEach((com) => (commandList[com] = args._.includes(com)));

    cliArgs = { ...cliArgs, help: args["--help"] || false, ...commandList };
  } catch (err: any) {
    process.on("unhandledRejection", () => {
      if (ARG_ERRORS.includes(err.code)) {
        console.log(logSymbols.error, chalk.red(err.message));
      } else {
        throw err;
      }

      process.exit(1);
    });
  }

  return cliArgs;
}
