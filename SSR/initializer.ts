import { getLanguage } from "@i18n/getLanguage";
import { getInitialProps, initializeI18N } from "@i18n/initializer";
import { serverPreloadNS } from "@i18n/serverPreloadNS";
import { changeLanguage } from "@i18n/setLanguage";
import { languages } from "@i18n/settings";
import StoreInitializer from "@init-src/stores/StoreInitializer";
import i18next from "i18next";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Page } from "./client";
import { DecoratePage, DecoratePageResponse } from "./types";

export type SSRAppItem = {
  path: string;
  initializer?: (page: Page) => Promise<{
    decorate?: DecoratePage;
    decorateResponse?: DecoratePageResponse;
  }>;
};

export const emptyInitializer: NonNullable<SSRAppItem["initializer"]> = () =>
  Promise.resolve({ decorate() {} });

export const initializer: SSRAppItem["initializer"] = async (page) => {
  renderToString(createElement(StoreInitializer, { page }, null));

  const i18n = await initializeI18N(page);
  await serverPreloadNS();

  if (languages.includes(getLanguage(page))) {
    changeLanguage(getLanguage(page), i18next, page);
  }

  const decorate: DecoratePage = (page) => {
    const props = getInitialProps(i18n);

    page.meta!._i18nInitialResources = JSON.stringify(props.initialI18nStore);
    page.meta!._i18nLanguage = props.initialLanguage;
  };

  return { decorate };
};
