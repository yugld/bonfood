import type { InitOptions } from "i18next";

export const cookieName = "lang";
export const defaultNamespace = "translation";
export const fallbackLng = "ru";
export const languages = ["kz", fallbackLng];

export function getOptions<T extends object>(
  lng = fallbackLng,
  ns = defaultNamespace,
): InitOptions<T> {
  return {
    debug: false,
    // debug: process.env.NODE_ENV === "development",
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    nsSeparator: "::",
    ns,
  };
}
