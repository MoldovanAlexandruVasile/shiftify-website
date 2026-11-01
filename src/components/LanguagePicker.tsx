import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { currentLanguage, LANGUAGES } from "../i18n";

// RO / EN dropdown in the top bar. The choice is saved (localStorage) by the
// language detector, so it sticks across pages and visits.
export function LanguagePicker() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === currentLanguage()) ?? LANGUAGES[1];

  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div className="lang" ref={root}>
      <button
        type="button"
        className="lang__button"
        aria-label={`${t("nav.language")}: ${current.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <GlobeIcon />
        {current.label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen ? (
        <div className="lang__menu" role="menu">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              role="menuitemradio"
              aria-checked={language.code === current.code}
              className={`lang__item${language.code === current.code ? " is-active" : ""}`}
              onClick={() => {
                i18n.changeLanguage(language.code);
                setIsOpen(false);
              }}
            >
              <strong>{language.label}</strong>
              {language.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}
