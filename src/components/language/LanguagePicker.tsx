import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDismiss } from "../../hooks/useDismiss";
import { currentLanguage, LANGUAGES, type Language } from "../../i18n";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { GlobeIcon } from "../icons/GlobeIcon";
import { LanguageMenuItem } from "./LanguageMenuItem";

// RO / EN dropdown in the top bar. The choice is saved (localStorage) by the
// language detector, so it sticks across pages and visits.
export const LanguagePicker = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useDismiss(root, isOpen, close);

  const current = LANGUAGES.find((l) => l.code === currentLanguage()) ?? LANGUAGES[1];
  const pick = (code: Language) => {
    i18n.changeLanguage(code);
    close();
  };

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-2.5 py-[7px] text-[0.85rem] font-semibold text-ink hover:border-primary"
        aria-label={`${t("nav.language")}: ${current.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <GlobeIcon />
        {current.label}
        <ChevronDownIcon size={12} />
      </button>
      {isOpen ? (
        <div
          className="absolute top-[calc(100%+8px)] right-0 z-20 min-w-40 rounded-[14px] border border-line bg-surface p-1.5 shadow-soft"
          role="menu"
        >
          {LANGUAGES.map((language) => (
            <LanguageMenuItem
              key={language.code}
              language={language}
              isCurrent={language.code === current.code}
              onPick={() => pick(language.code)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
