import { accessSync, constants, readFileSync } from "fs";
import { join, resolve } from "path";

export const filePath = resolve(
  process.cwd().endsWith("setup")
    ? process.cwd()
    : join(process.cwd(), ".setup"),
  "src.json",
);

export const isFileAccessable = () => accessSync(filePath, constants.R_OK);

export const getFileContent = (): Source[] => {
  const content = readFileSync(filePath, {
    encoding: "utf-8",
  });

  if (!content.trim()) {
    throw new Error("Source config file is empty!");
  }

  return JSON.parse(content);
};

export type Source =
  | {
      type: string;
      ssr: false;
      path: string | string[];
      output: string;
      basePath?: string;
      tailwindContent?: string | string[];
      tailwindContentExcluede?: string | string[];
      enabled: boolean;
      manualChunks?: Record<string, string[]>;
    }
  | {
      type: string;
      ssr: true;
      path: string;
      output: string;
      enabled: boolean;
    };

export type SourceParserOutput = {
  outDir: string;
  basePath: string;
  input: string[];
  tailwindContent: string[];
  ssr: string | false;
  manualChunks: Record<string, string[]>;
};

function getSourceContent(
  includeTailwindExclude: boolean = true,
): (source: Source) => SourceParserOutput {
  return (source: Source): SourceParserOutput => {
    const result: SourceParserOutput = {
      input: [],
      tailwindContent: [],
      outDir: "",
      basePath: "",
      ssr: false,
      manualChunks: {},
    };

    if (source.ssr === true) {
      result.ssr = source.path;
      result.outDir = source.output;
      return result;
    }

    if (!!source.output) {
      result.outDir = source.output;
    }

    if (!!source.basePath) {
      result.basePath = source.basePath;
    }

    const pushPath = (path: string | string[]) => {
      Array.isArray(path)
        ? result.input.push(...path)
        : result.input.push(path);
    };

    if (typeof source.path === "string") {
      pushPath(source.path);
    } else if (Array.isArray(source.path)) {
      source.path.forEach(pushPath);
    }

    if (typeof source.tailwindContent === "string") {
      result.tailwindContent.push(source.tailwindContent);
    } else if (Array.isArray(source.tailwindContent)) {
      result.tailwindContent.push(...source.tailwindContent);
    }

    if (includeTailwindExclude) {
      if (typeof source.tailwindContentExcluede === "string") {
        result.tailwindContent.push("!" + source.tailwindContentExcluede);
      } else if (Array.isArray(source.tailwindContentExcluede)) {
        result.tailwindContent.push(
          ...source.tailwindContentExcluede.map((path) => "!" + path),
        );
      }
    }

    if (source.manualChunks) {
      result.manualChunks = source.manualChunks;
    }

    return result;
  };
}

export default (type: string = process.env.TYPE || ""): SourceParserOutput => {
  isFileAccessable();
  const data = getFileContent();

  if (type === "all") {
    const enableds = data.filter((item) => item.enabled);

    return enableds.map(getSourceContent(false)).reduce(
      (acc, item) => {
        if (item.ssr) {
          return acc;
        }

        acc.input.push(...item.input);
        acc.tailwindContent.push(...item.tailwindContent);
        return acc;
      },
      {
        input: [],
        tailwindContent: [],
        outDir: "",
        basePath: "",
        ssr: false,
        manualChunks: {},
      },
    );
  }

  const source = data.find((item) => item.type === type);

  if (!source)
    throw new Error("Source option with type [" + type + "] not found!");

  if (!source.enabled)
    throw new Error("Source option with type [" + type + "] is not enabled!");

  return getSourceContent()(source);
};
