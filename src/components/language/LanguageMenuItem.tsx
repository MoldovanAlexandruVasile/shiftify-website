import { cx } from "../../utils/cx";
import type { LanguageOption } from "./languageOption";

type Props = { language: LanguageOption; isCurrent: boolean; onPick: () => void };

export const LanguageMenuItem = ({ language, isCurrent, onPick }: Props) => (
  <button
    type="button"
    role="menuitemradio"
    aria-checked={isCurrent}
    className={cx(
      "flex w-full cursor-pointer items-center gap-2.5 rounded-[9px] px-2.5 py-[9px] text-left text-[0.9rem] hover:bg-primary-soft hover:text-on-primary-soft",
      isCurrent ? "bg-primary-soft text-on-primary-soft" : "text-ink",
    )}
    onClick={onPick}
  >
    <strong className={cx("w-6 text-[0.8rem]", isCurrent ? "text-primary" : "text-muted")}>{language.label}</strong>
    {language.name}
  </button>
);
