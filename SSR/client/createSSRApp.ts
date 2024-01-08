import { ReactNode, createElement } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import type {
  CreateSSROptions,
  Page,
  ProviderProps,
  ReqRes,
  SetupOptions,
} from "../types";
import Provider from "./Provider";

const defaultClientSetup = ({ el, Provider, props }: SetupOptions) => {
  if (el) {
    const provider = createElement(Provider, props);

    if (el.hasChildNodes()) {
      hydrateRoot(el, provider);
    } else {
      createRoot(el).render(provider);
    }

    const initialPage = props.getInitialPageData();
    if (initialPage.errorMessage) {
      console.warn("SSR SERVER ERROR: ", initialPage.errorMessage);
    }
  }
};

const defaultServerSetup = ({ Provider, props }: SetupOptions) => {
  return createElement(Provider, props);
};

export default async function createSSRApp({
  resolve,
  setup,
  page,
  render,
}: CreateSSROptions): Promise<{ head: string[]; body: string }> {
  const isServer = typeof window === "undefined";

  const setupCallback =
    setup || (isServer ? defaultServerSetup : defaultClientSetup);

  const el: HTMLElement | null = isServer
    ? null
    : document.querySelector("init-app") || document.getElementById("app");

  const initialPage = page || (JSON.parse(el?.dataset?.page || "{}") as Page);

  if (typeof window !== "undefined" && el) {
    el.removeAttribute("data-page");
  }

  const resolveComponent = (page: Page) =>
    Promise.resolve(resolve(page)).then((module) => ({
      page:
        (module.page as { default: ProviderProps["initialComponent"] })
          .default || (module.page as ProviderProps["initialComponent"]),
      decoratePage: module.decoratePage,
      decorateResponse: module.decorateResponse,
    }));

  let head: string[] = [];

  if (!("component" in initialPage))
    throw new Error("Component is not in default props");

  const initialPageHandler = await resolveComponent(initialPage);

  const reactApp = setupCallback({
    el,
    Provider,
    props: {
      initialComponent: initialPageHandler.page,
      getInitialPageData: () => initialPage as Page & ReqRes,
      onHeadUpdate: isServer ? (elements) => (head = elements) : null,
    },
  });

  if (isServer) {
    if (!render) return { head, body: "" };

    delete (initialPage as Page & Partial<ReqRes>)._request;
    delete (initialPage as Page & Partial<ReqRes>)._response;

    await initialPageHandler?.decoratePage?.(initialPage);

    const body = await render(
      createElement(
        "init-app",
        {
          "data-page": JSON.stringify(initialPage),
        },
        reactApp as ReactNode,
      ),
    );

    const response = await initialPageHandler?.decorateResponse?.({
      head,
      body,
    });

    return response || { head, body };
  }

  return { head, body: "" };
}
