import { getLanguage } from "@i18n/getLanguage";
import { initializeI18N } from "@i18n/initializer";
import { changeLanguage } from "@i18n/setLanguage";
import { languages } from "@i18n/settings";
import { usePage } from "@ssr-client/usePage";
import i18next from "i18next";
import { ReactNode } from "react";

const isServer = typeof window === "undefined";

let isInitialized = false;

function I18NInitializer({ children }: { children?: ReactNode }) {
  const page = usePage();

  if (!isInitialized) {
    isInitialized = true;
    try {
      initializeI18N(page).catch(console.warn);
    } catch (error) {
      console.log(error);
    }
  }

  if (isServer) {
    if (languages.includes(getLanguage(page))) {
      changeLanguage(getLanguage(page), i18next, page);
    }
  }

  return <>{children}</>;
}

export default I18NInitializer;
