import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import resources from "../locales";

const options: InitOptions = {
  resources,
  debug: process.env.NODE_ENV === "development",
  fallbackLng: ["en", "fr"],
  supportedLngs: ["en", "fr"],
  detection: {
    order: ["localStorage", "navigator"],
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"],
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
    format: (value, format, lng) => {
      console.log("piss", { value, format, lng });
      if (value instanceof Date) {
        const options: Intl.DateTimeFormatOptions = {
          dateStyle: "short",
          timeStyle: format === "date" ? undefined : "short",
        };
        return new Intl.DateTimeFormat(lng + "-CA", options).format(value);
      }

      return value;
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init(options);

export default i18n;
