import arg from "arg";
import chalk from "chalk";
import logSymbols from "log-symbols";

import type { Args, Options } from "../types";

export default function parseArgs(rawArgs: Args): Options | undefined {
  try {
    const args = arg(
      {
        "--help": Boolean,
        "-h": "--help",
      },
      {
        argv: rawArgs.slice(2),
      }
    );

    return {
      help: args["--help"] || false,
    };
  } catch (err: any) {
    process.on("unhandledRejection", () => {
      if (err.code === "ARG_UNKNOWN_OPTION") {
        console.log(logSymbols.error, chalk.red(err.message));
      } else {
        throw err;
      }
      process.exit(1);
    });
  }
}
