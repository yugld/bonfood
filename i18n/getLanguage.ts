import { cookieName, fallbackLng, languages } from "@i18n/settings";
import { Page, ReqRes } from "../SSR/types";

export const getLanguageFromPath = (page: Page | string) => {
  const isServer = typeof window === "undefined";
  let path = typeof page === "string" ? page : page.location;
  if (!isServer && typeof page !== "string") {
    path = document.location.pathname;
  }
  const regex = /^\/(\w*?)(?=\/|$)/;
  const matchs = path.match(regex);
  if (matchs && languages.includes(matchs[1])) return matchs[1];
};

export const getLanguageFromCookie = (page: Page & ReqRes) => {
  const isServer = typeof window === "undefined";
  const cookieString = isServer
    ? page._request?.headers?.cookie
    : document.cookie;
  if (cookieString && cookieString.includes(cookieName)) {
    const cookiesArray = cookieString.split("; ");
    const languageCookie = cookiesArray.find((cookie) =>
      cookie.startsWith(`${cookieName}=`),
    );
    if (languageCookie) {
      const language = languageCookie.split("=")[1];
      return language;
    }
  }
};

export const getLanguageFromHeader = (page: Page & ReqRes) => {
  const isServer = typeof window === "undefined";
  if (!isServer) {
    return;
  }
  const languageCookie = page?._request?.headers[cookieName];
  if (languageCookie) {
    const language = Array.isArray(languageCookie)
      ? languageCookie.join()
      : languageCookie;
    return language;
  }
};

export const getLanguage = (page: Page): string => {
  const fromPath = getLanguageFromPath(page);
  if (fromPath) return fromPath;
  const fromCookie = getLanguageFromCookie(page as Page & ReqRes);
  if (fromCookie) return fromCookie;
  const fromHeader = getLanguageFromHeader(page as Page & ReqRes);
  if (fromHeader) return fromHeader;
  return fallbackLng;
};
