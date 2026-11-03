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

// The visitor's own choice (saved when they pick one), else the browser's
// language: Romanian for any ro-* locale, English otherwise.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
syncHtmlLang();
i18n.on("languageChanged", syncHtmlLang);

export default i18n;
