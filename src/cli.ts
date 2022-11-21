import parseArgs from "./utils/parseArgs";

import type { Args } from "./types";
import welcome from "./utils/welcome";
import { run } from "./utils/handler";
import newCli from "./scripts/newCli";

export async function cli(args: Args) {
  run(welcome, args.slice(2).length === 0);

  const options = parseArgs(args);

  run(newCli, options?.new);

  if (options?.help) {
    welcome(true);
  }
}
