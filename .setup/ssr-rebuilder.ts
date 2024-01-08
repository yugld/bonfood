import { exec as execBase, spawn } from "child_process";
import { promisify } from "util";
const exec = promisify(execBase);

const buildSSR = (dirname: string) => {
  return exec(`cd ${dirname} && npm run build:ssr`);
};

const shutdownSSRServer = () => {
  return fetch("http://localhost:1450/shutdown");
};

type OKResponse = {
  status: "OK";
  timestamp: number;
};

const isSSRServerUp = async () => {
  try {
    const res = await fetch("http://localhost:1450/health");
    if (res.ok) {
      const data = (await res.json()) as OKResponse;
      if (data.status === "OK") return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
};

const startSSRServer = (dirname: string) => {
  return new Promise((res) => {
    const ssrProcess = spawn("npm", ["run", "ssr:start"], {
      cwd: dirname,
      stdio: ["pipe", "pipe", "pipe"],
    });

    ssrProcess.stdout.on("data", (data: { toString: () => string }) => {
      if (data.toString().includes("server started")) {
        ssrProcess.unref();
        res(true);
      }
    });

    ssrProcess.stderr.on("data", () => {
      ssrProcess.unref();
      res(false);
    });
  });
};

export const reloadSSR = async (dirname: string) => {
  try {
    console.log("Shutting down server for build...");
    let attempts = 0;

    const loop = true;
    while (loop) {
      if (attempts++ > 3) break;
      if (!(await isSSRServerUp())) break;
      const res = await shutdownSSRServer();
      const data = (await res.json()) as OKResponse;
      if (data.status === "OK") console.log("Server shutted down!");
      if (data.status === "OK") break;
    }
  } catch (error) {
    console.log(error);
  }

  let isSuccessBuild = false;
  try {
    console.log("Building SSR server...");
    const response = await buildSSR(dirname);
    isSuccessBuild = response.stdout.includes("built in");
    if (isSuccessBuild) console.log("SSR server builded");
  } catch (error) {
    console.log(error);
  }

  if (!isSuccessBuild) return;

  try {
    let attempts = 0;

    const loop = true;
    while (loop) {
      if (attempts++ > 3) break;
      console.log("Starting SSR server...");
      const res = await startSSRServer(dirname);
      if (res) {
        console.log("SSR server started!");
        break;
      }

      if (await isSSRServerUp()) {
        await shutdownSSRServer();
      }

      console.log("SSR server start failed");
    }
  } catch (error) {
    console.log(error);
  }
};
