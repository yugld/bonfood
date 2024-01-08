import i18next, { loadNamespaces, type Resource, type i18n } from "i18next";

import { getLanguage } from "@i18n/getLanguage";
import { getOptions, languages } from "@i18n/settings";
import { defaultZodNs, zodI18nMap } from "@i18n/zodI18N";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { Page } from "../SSR/types";

const isServer = typeof window === "undefined";

export const getInitialProps = (i18n?: i18n) => {
  const instance = i18n || i18next;

  if (!instance.reportNamespaces)
    return {
      initialI18nStore: {
        [instance.language]: instance.store.data[instance.language],
      },
      initialLanguage: instance.language,
    };

  const namespaces = instance.reportNamespaces.getUsedNamespaces();
  const result: Record<string, unknown> = {};

  namespaces.forEach((ns) => {
    result[ns] = instance.getResourceBundle(instance.language, ns) || {};
  });

  return {
    initialI18nStore: { [instance.language]: result },
    initialLanguage: instance.language,
  };
};

export const initializeI18N = async (page: Page) => {
  if (i18next.isInitialized) return i18next;

  const lang = (page?.meta?._i18nLanguage || getLanguage(page)) as string;

  await i18next // eslint-disable-line
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      ...getOptions(),
      initImmediate: false,
      lng: lang,
      preload: isServer ? languages : [],
      react: {
        useSuspense: false,
      },
    });

  if (!isServer) {
    const initialResource = (JSON.parse(
      (page?.meta?._i18nInitialResources as string) || "null",
    ) || {}) as unknown as Resource;

    i18next.services.resourceStore.data = initialResource;

    // add namespaces to the config - so a languageChange call loads all namespaces needed
    i18next.options.ns = Object.values(initialResource).reduce<string[]>(
      (mem, lngResources) => {
        Object.keys(lngResources).forEach((ns) => {
          if (mem.indexOf(ns) < 0) mem.push(ns);
        });
        return mem;
      },
      i18next.options.ns as string[],
    );

    (i18next as i18n & { initializedStoreOnce: boolean }).initializedStoreOnce =
      true;
    i18next.isInitialized = true;
  }

  await loadNamespaces(defaultZodNs);
  z.setErrorMap(zodI18nMap);
  return i18next;
};
