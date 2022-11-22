import parseArgs from "./utils/parseArgs";

import welcome from "./utils/welcome";
import { run } from "./utils/handler";
import newCli from "./scripts/newCli";

export async function cli(args: Args) {
  run(welcome, args.slice(2).length === 0);

  const options = parseArgs(args);
  console.log(options);

  run(newCli, options.new || options.project.length > 0, options.project);

  if (options.help) {
    welcome(true);
  }
}
