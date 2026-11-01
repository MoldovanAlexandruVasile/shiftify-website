import { currentLanguage, LANGUAGES } from "../../i18n";

export type LanguageOption = (typeof LANGUAGES)[number];

/** The language the site is in now, with its label and name. */
export const currentLanguageOption = (): LanguageOption =>
  LANGUAGES.find((l) => l.code === currentLanguage()) ?? LANGUAGES[1];
