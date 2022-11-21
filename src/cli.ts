import parseArgs from "./utils/parseArgs";

import type { Args } from "./types";
import welcome from "./utils/welcome";
import { run } from "./utils/handler";

export async function cli(args: Args) {
  run(welcome, args.slice(2).length === 0);

  const options = parseArgs(args);

  if (options?.help) {
    welcome(true);
  }
}
