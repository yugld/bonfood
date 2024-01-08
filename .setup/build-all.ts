import { exec as execBase } from "child_process";
import { promisify } from "util";
import { getFileContent, isFileAccessable } from "./source-parser";

const exec = promisify(execBase);

async function main() {
  isFileAccessable();
  const data = getFileContent().filter((item) => item.enabled);

  for (const source of data) {
    console.log(`\nBUILDING ${source.type.toUpperCase()}\n`);
    const result = await exec(
      `npx cross-env TYPE=${source.type} npx vite build`,
    );

    console.log(result.stdout);
    console.log(
      `\nERRORS WHILE BUILDING ${source.type.toUpperCase()}: ${
        result.stderr.trim() ? result.stderr.trim() : "No Errors!"
      }`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
