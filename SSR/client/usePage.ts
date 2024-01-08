import { useContext } from "react";
import { Page } from "../types";
import PageContext from "./PageContext";

export function usePage(): Page {
  const page = useContext(PageContext);

  if (!page) {
    throw new Error("usePage must be used within the init component");
  }

  return page.page;
}

type SetPageCallBack = (page: Page) => Page;

export function usePageSetter(): (callback: SetPageCallBack) => void {
  const page = useContext(PageContext);

  if (!page) {
    throw new Error("usePage must be used within the init component");
  }

  return page.setPage;
}

export const getInitialPage = (function () {
  const el: HTMLElement | null =
    typeof window === "undefined"
      ? null
      : document.querySelector("init-app") || document.getElementById("app");
  let page: Page | null = null;
  return function (setPage?: Page) {
    if (setPage) page = setPage;
    if (typeof window !== "undefined") {
      const initialPage = JSON.parse(el?.dataset?.page || "{}") as Page;
      return initialPage || page;
    }
    return page;
  };
})();

const traverseObject = (obj: unknown, keys: string[]): unknown => {
  let result: unknown = obj;

  for (const key of keys) {
    const match = key.match(/(\w+)(?:\[(\d+)\])?/);

    if (match) {
      const [, propName, index] = match;
      /* eslint-disable-next-line */
      result = (result as any)[propName];
      if (index !== undefined) {
        /* eslint-disable-next-line */
        result = (result as any)[parseInt(index, 10)];
      }
    } else {
      /* eslint-disable-next-line */
      result = (result as any)[key];
    }

    if (result === undefined) {
      break; // Break if the property doesn't exist
    }
  }

  return result;
};

export const usePageProp = <T>(path: string): T | undefined => {
  const page = usePage();
  const keys = path.split(".");
  return traverseObject(page.props, keys) as T;
};

export const usePageMeta = <T>(path: string): T | undefined => {
  const page = usePage();
  const keys = path.split(".");
  return traverseObject(page.meta, keys) as T;
};

export const useWithDefault = <T>(
  value: T | null | undefined,
  defaultValue: NonNullable<T>,
): NonNullable<T> => {
  return value !== null && value !== undefined ? value : defaultValue;
};

export const usePageCSRF = (): string => {
  const page = usePage();
  return page.csrfToken;
};
