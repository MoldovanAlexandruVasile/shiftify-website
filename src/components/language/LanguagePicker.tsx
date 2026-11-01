import { useTranslation } from "react-i18next";

import { useDropdown } from "../../hooks/useDropdown";
import type { Language } from "../../i18n";
import { LanguageButton } from "./LanguageButton";
import { LanguageMenu } from "./LanguageMenu";
import { currentLanguageOption } from "./languageOption";

// RO / EN dropdown in the top bar. The choice is saved (localStorage) by the
// language detector, so it sticks across pages and visits.
export const LanguagePicker = () => {
  const { i18n } = useTranslation();
  const { root, isOpen, close, toggle } = useDropdown();
  const current = currentLanguageOption();

  const pick = (code: Language) => {
    i18n.changeLanguage(code);
    close();
  };

  return (
    <div className="relative" ref={root}>
      <LanguageButton current={current} isOpen={isOpen} onClick={toggle} />
      {isOpen ? <LanguageMenu current={current} onPick={pick} /> : null}
    </div>
  );
};
