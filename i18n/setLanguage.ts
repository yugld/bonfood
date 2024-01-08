import { cookieName, fallbackLng, languages } from "@i18n/settings";
import { defaultZodNs, zodI18nMap } from "@i18n/zodI18N";
import { LANGUAGE_CHANGED_EVENT } from "@init-src/events";
import eventBus from "@init-src/libs/EventBus";
import { loadNamespaces, type i18n } from "i18next";
import { z } from "zod";
import { Page, ReqRes } from "../SSR/types";

export const setLanguageToPath = (
  lang: string,
  page: (Page & ReqRes) | string,
) => {
  const isServer = typeof window === "undefined";
  let path = typeof page === "string" ? page : page.location;

  if (!isServer && typeof page !== "string") {
    path = document.location.pathname;
  }

  // Define the regex pattern for matching the two letters at the start of the path
  const regex = /^\/(\w{2})(\/|$)/;
  const matches = path.match(regex);
  // Replace the language part or prepend it to the path
  let newPath = lang === fallbackLng ? "/" : `/${lang}/`;
  newPath += matches
    ? `${path.replace(matches[0], "").trim().replace(/^\/*/, "")}`
    : path.trim().replace(/^\/*/, "");

  if (typeof page === "string") {
    return newPath;
  }

  if (!isServer) {
    if (document.location.search) newPath += "?" + document.location.search;
  }

  if (!isServer) {
    window.history.replaceState(null, "", window.location.origin + newPath);
  }
};

export const setLanguageToCookie = (lang: string, page: Page & ReqRes) => {
  const isServer = typeof window === "undefined";

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const cookieString = `${cookieName}=${lang}; expires=${expires.toUTCString()}; path=/`;

  if (isServer) {
    page?._response?.setHeader("Set-Cookie", cookieString);
  } else {
    document.cookie = cookieString;
  }
};

export const changeLanguage = (newLanguage: string, i18n: i18n, page: Page) => {
  if (!languages.includes(newLanguage)) return false;
  i18n
    .changeLanguage(newLanguage)
    .then(() => {
      loadNamespaces(defaultZodNs)
        .then(() => {
          z.setErrorMap(zodI18nMap);
        })
        .catch(console.warn);
    })
    .catch(console.warn);

  setLanguageToCookie(newLanguage, page as Page & ReqRes);
  setLanguageToPath(newLanguage, page as Page & ReqRes);

  eventBus.emit(LANGUAGE_CHANGED_EVENT, null, newLanguage);
};
