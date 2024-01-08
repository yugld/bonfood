import { initializeI18N } from "@i18n/initializer";
import StoreInitializer from "@init-src/stores/StoreInitializer";
import { createSSRApp } from "@ssr-client/index";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

if (typeof window !== "undefined") {
  createSSRApp({
    resolve: async (page) => {
      renderToString(createElement(StoreInitializer, { page }, null));
      const i18n = await initializeI18N(page);
      return {
        page: () => createElement(App, { i18n }, null),
      };
    },
  }).catch(console.warn);
}

export default App;
