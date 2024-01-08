import { normalize } from "path";
import { renderToString } from "react-dom/server";
import { createSSRApp, getInitialPage } from "./client";
import { SSRAppItem, emptyInitializer, initializer } from "./initializer";
import { createSSRServer } from "./server";

const name = "bonfood-new";

const APPS: Record<string, SSRAppItem> = {
  init: {
    path: "./../themes/init/src/SSR-App.tsx",
    initializer,
  },

  [name]: {
    path: "./../themes/bonfood-new/src/SSR-App.tsx",
    initializer,
  },
};

const getPathByNormalizing = (paths: string[], toFingPath: string) => {
  let resolvedPath: string | null = null;
  const normalizedFilePath = normalize(toFingPath);
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const normalizedPath = normalize(path);
    if (normalizedPath === normalizedFilePath) {
      resolvedPath = path;
      break;
    }
  }
  return resolvedPath;
};

createSSRServer((page) => {
  getInitialPage(page);
  return createSSRApp({
    page,
    render: renderToString,
    resolve: async (page) => {
      const component = APPS[page.component.toLocaleLowerCase()] || {
        path: "",
        initializer: async () => {},
      };

      const pages = import.meta.glob(
        [
          "../**/SSR-App.tsx",
          "./NotFound.tsx",
          "!../node_modules/**",
          "!../.setup/**",
          "!../plugins/**",
        ],
        {
          eager: true,
        },
      );
      const pagesPaths = Object.keys(pages);
      const pathExists = pagesPaths.includes(component.path);

      if (pathExists) {
        const { decorate, decorateResponse } = await (
          component.initializer || emptyInitializer
        )(page);
        return {
          page: pages[component.path],
          decoratePage: decorate,
          decorateResponse,
        };
      }

      const resolvedPath = getPathByNormalizing(pagesPaths, component.path);

      if (resolvedPath) {
        const { decorate, decorateResponse } = await (
          component.initializer || emptyInitializer
        )(page);
        return {
          page: pages[resolvedPath],
          decoratePage: decorate,
          decorateResponse,
        };
      }

      return {
        page: pages["./NotFound.tsx"],
      };
    },
  });
});
