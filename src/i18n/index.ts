import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ro from "./locales/ro.json";

export const LANGUAGES = [
  { code: "ro", label: "RO", name: "Română" },
  { code: "en", label: "EN", name: "English" },
] as const;
export type Language = (typeof LANGUAGES)[number]["code"];

// In a browser; not when the pages are pre-rendered at build time (in English).
const isBrowser = typeof window !== "undefined";

// The visitor's own choice (saved when they pick one), else the browser's
// language: Romanian for any ro-* locale, English otherwise.
if (isBrowser) i18n.use(LanguageDetector);
i18n
  .use(initReactI18next)
  .init({
    ...(isBrowser ? {} : { lng: "en" }),
    // The texts are bundled, so they're ready at once (no flash, and the
    // build-time render has them too).
    initAsync: false,
    resources: { en: { translation: en }, ro: { translation: ro } },
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "tivren-language",
      caches: ["localStorage"],
    },
  });

/** The current language, as one of ours. */
export const currentLanguage = (): Language => (i18n.resolvedLanguage === "ro" ? "ro" : "en");

// Keep <html lang> in step, for screen readers and hyphenation.
const syncHtmlLang = () => {
  document.documentElement.lang = currentLanguage();
};
if (isBrowser) {
  syncHtmlLang();
  i18n.on("languageChanged", syncHtmlLang);
}

export default i18n;
