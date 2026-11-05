import { LanguagePicker as Picker } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { currentLanguage, LANGUAGES } from "../i18n";

// RO / EN dropdown in the top bar. The choice is saved (localStorage) by the
// language detector, so it sticks across pages and visits.
export const LanguagePicker = () => {
  const { t, i18n } = useTranslation();
  return (
    <Picker
      languages={LANGUAGES}
      current={currentLanguage()}
      onPick={(code) => i18n.changeLanguage(code)}
      ariaLabel={t("nav.language")}
    />
  );
};
