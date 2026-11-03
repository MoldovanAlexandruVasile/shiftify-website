import { useTranslation } from "react-i18next";

import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { GlobeIcon } from "../icons/GlobeIcon";
import type { LanguageOption } from "./languageOption";

type Props = { current: LanguageOption; isOpen: boolean; onClick: () => void };

/** "🌐 EN ⌄": opens the language menu. */
export const LanguageButton = ({ current, isOpen, onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-1.5 h-10 rounded-full border border-line px-3 max-sm:px-2.5 text-[0.85rem] font-semibold text-ink hover:border-primary"
      aria-label={`${t("nav.language")}: ${current.name}`}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <span className="max-sm:hidden">
        <GlobeIcon />
      </span>
      {current.label}
      <ChevronDownIcon size={12} />
    </button>
  );
};
