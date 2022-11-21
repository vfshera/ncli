import parseArgs from "./utils/parseArgs";

import type { Args } from "./types";
import welcome from "./utils/welcome";

export async function cli(args: Args) {
  if (args.slice(2).length === 0) {
    welcome();
  }

  const options = parseArgs(args);

  if (options?.help) {
    welcome(true);
  }
}
