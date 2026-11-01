import { useTranslation } from "react-i18next";

import { cx } from "../../utils/cx";
import { SYSTEMS, type System } from "./system";

type Props = { system: System; onPick: (system: System) => void };

export const InstallTabs = ({ system, onPick }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className="mx-auto mt-8 flex w-fit justify-center gap-1.5 rounded-full border border-line bg-surface p-[5px]"
      role="tablist"
      aria-label={t("install.tabs")}
    >
      {SYSTEMS.map((s) => (
        <button
          key={s}
          type="button"
          role="tab"
          aria-selected={s === system}
          className={cx(
            "cursor-pointer rounded-full px-5.5 py-2 font-semibold",
            s === system ? "bg-primary text-on-primary" : "text-muted",
          )}
          onClick={() => onPick(s)}
        >
          {t(`install.${s}`)}
        </button>
      ))}
    </div>
  );
};
