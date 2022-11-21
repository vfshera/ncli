import arg from "arg";
import chalk from "chalk";
import logSymbols from "log-symbols";

import type { Args, Options } from "../types";
import mapCommands from "./commands";
import mapFlags from "./flags";

const ARG_ERRORS = ["ARG_CONFIG_NONOPT_KEY", "ARG_UNKNOWN_OPTION"];

export default function parseArgs(rawArgs: Args): Options | undefined {
  try {
    const args = arg(mapFlags(), {
      argv: rawArgs.slice(2),
    });

    const commandList: any = {};
    mapCommands().forEach((com) => (commandList[com] = args._.includes(com)));

    return {
      help: args["--help"] || false,
      ...commandList,
    };
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
}
