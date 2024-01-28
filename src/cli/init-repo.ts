import { confirm, select } from "@inquirer/prompts";
import fs from "fs";
import path from "path";
import { copyFilesToSDK } from "./output";
import { getParserConfig } from "./parser-config";

export async function initRepo(domain, options) {
  const sdkDir = path.join(process.cwd(), domain);
  const originDir =
    process.env.NODE_ENV === "development"
      ? path.join(process.argv[1], "../../../..", "notehost")
      : path.join(process.argv[1], "../..", "notehost");

  const parserConfig = await getParserConfig(domain, options);

  const templates = fs.readdirSync(path.join(originDir, "templates"));
  const template =
    templates.length > 1
      ? await select({
          message: "Generate from template:",
          choices: templates.map((t) => ({ name: t, value: t })),
        })
      : templates[0];

  console.log(`\n🎬 Ready to generate NoteHost worker in: ${sdkDir}`);
  await confirm({ message: "Continue?", default: true });

  console.log("Generating...");

  copyFilesToSDK({
    parserConfig,
    originDir: path.join(originDir, "templates", template),
    sdkDir,
  });

  console.log(`\n🎉 Done! Your worker is in`, sdkDir);
  console.log("\nGo into this directory and run `npm install`");
  console.log("Edit `src/site-config.ts` to setup your website.");
  console.log("And finally run `npm run deploy` to publish your website.");

  process.exit(0);
}
