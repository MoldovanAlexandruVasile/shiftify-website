import { useTranslation } from "react-i18next";

import { InstallTab } from "./InstallTab";
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
        <InstallTab key={s} label={t(`install.${s}`)} isSelected={s === system} onClick={() => onPick(s)} />
      ))}
    </div>
  );
};
