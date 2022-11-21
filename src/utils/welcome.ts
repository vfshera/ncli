import figlet from "figlet";
import gradientString from "gradient-string";
import { fileURLToPath } from "node:url";
import path from "path";
import fs from "@supercharge/filesystem";
import chalk from "chalk";
import { flagOptions } from "./flags";
import { cmdOptions } from "./commands";
import { run } from "./handler";

function usage() {
  return `${chalk.hex("#1e1d40").bgHex("#33dd2d").bold(" USAGE ")}\n
  ${
    chalk.hex("#33dd2d").italic("make-cli") +
    "  " +
    chalk.hex("#0087d8").italic("new") +
    "  " +
    chalk.hex("#ff9248").italic("[cli-name]")
  }`;
}

export default async function welcome(withOptions = false) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const rawpkg = await fs.readFile(path.join(__dirname, "..", "package.json"));
  const pkg = JSON.parse(rawpkg);

  figlet(pkg.name, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }

    const msg = `
${gradientString.instagram(data)}
${chalk.hex("#33dd2d").italic("v" + pkg.version)} ${chalk.italic(
      pkg.description
    )}
    
${chalk.hex("#1e1d40").bgWhite.bold(" Made by " + pkg.author + " ")} 
    `;

    console.log(msg);

    if (withOptions) {
      console.log(`
${usage()} \n
${cmdOptions()}
${flagOptions()}\n`);
    }
  });
}
