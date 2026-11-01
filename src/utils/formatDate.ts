import type { Language } from "../i18n";

const DATE_LOCALE: Record<Language, string> = { en: "en-GB", ro: "ro-RO" };

/** "1 November 2026" / "1 noiembrie 2026", from "2026-11-01". */
export const formatDate = (iso: string, language: Language) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(DATE_LOCALE[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
