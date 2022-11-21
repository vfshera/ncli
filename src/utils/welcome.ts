import figlet from "figlet";
import gradientString from "gradient-string";

import { fileURLToPath } from "node:url";
import path from "path";
import fs from "@supercharge/filesystem";
import chalk from "chalk";
import { options } from "./flags";

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
${chalk.bgGreen(" v" + pkg.version + " ")} ${chalk.italic(pkg.description)}

${chalk.bold.green(pkg.author)}\n
${withOptions ? options() : ""}
    `;

    console.log(msg);
  });
}
