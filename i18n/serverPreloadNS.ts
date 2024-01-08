import { loadNamespaces } from "i18next";
import { lstatSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const serverPreloadNS = async (
  pathToLocalesFromSSRDist = "../../i18n/locales",
) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const preloaded = readdirSync(path.join(__dirname, pathToLocalesFromSSRDist))
    .map((fileName) => {
      const joinedPath = path.join(
        path.join(__dirname, pathToLocalesFromSSRDist),
        fileName,
      );

      return joinedPath;
    })
    .filter((path) => {
      const isDirectory = lstatSync(path).isDirectory();
      return isDirectory;
    })
    .reduce<string[]>((acc, path) => {
      const ns: string[] = readdirSync(path)
        .filter((file) => file.endsWith(".json"))
        .map((file) => file.replace(/.json$/, ""));

      return Array.from(new Set([...acc, ...ns]));
    }, []);

  await loadNamespaces(preloaded);
};
