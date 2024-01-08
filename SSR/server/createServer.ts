import { createServer, IncomingMessage } from "http";
import minimist from "minimist";
import * as process from "process";
import type { AppCallback, Page, ReqRes, RouteHandler } from "../types";

const readableToString: (readable: IncomingMessage) => Promise<string> = (
  readable,
) =>
  new Promise((resolve, reject) => {
    let data = "";
    readable.on("data", (chunk) => (data += chunk));
    readable.on("end", () => resolve(data));
    readable.on("error", (err) => reject(err));
  });

export default function createSSRServer(
  render: AppCallback,
  port?: number,
): void {
  const args = minimist(process.argv.slice(2));
  const parsedPort = Number(port || args["p"] || args["port"] || 1450);
  const _port = isNaN(parsedPort) ? 1450 : parsedPort;

  const routes: Record<string, RouteHandler> = {
    "/health": () => ({ status: "OK", timestamp: Date.now() }),
    "/shutdown": () => {
      setTimeout(() => process.exit(), 100);
      return { status: "OK", timestamp: Date.now() };
    },
    "/render": async (request, response) => {
      const data = JSON.parse(await readableToString(request)) as Page & ReqRes;

      if (!data.location)
        return {
          error: true,
          code: 422,
          message: "Location is missing in request!",
        };

      data._request = request;
      data._response = response;
      return render(data);
    },
    "/404": () => ({ status: "NOT_FOUND", timestamp: Date.now() }),
  };

  const handleRequest = async (
    request: ReqRes["_request"],
    response: ReqRes["_response"],
  ) => {
    const dispatchRoute = routes[<string>request.url] || routes["/404"];

    try {
      const result = (await dispatchRoute(request, response)) as Record<
        string,
        unknown
      >;

      response.writeHead(result.error ? (result.code as number) : 200, {
        "Content-Type": "application/json",
        Server: "Init SSR",
      });

      response.write(JSON.stringify(result));
    } catch (e) {
      response.writeHead(500, {
        "Content-Type": "application/json",
        Server: "Init SSR",
      });

      response.write(
        JSON.stringify({
          error: true,
          message:
            (e as Error).name +
            "\n" +
            (e as Error).message +
            "\n" +
            (e as Error).stack,
        }),
      );

      console.error(e);
    } finally {
      response.end();
    }
  };

  createServer((request, response) => {
    handleRequest(request, response).catch(console.warn);
  }).listen(_port, () => console.log("Init SSR server started."));

  console.log(`Starting SSR server on port ${_port}...`);
}
