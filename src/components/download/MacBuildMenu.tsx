import { useTranslation } from "react-i18next";

import type { LatestRelease } from "../../hooks/useLatestRelease";
import { cx } from "../../utils/cx";
import { MAC_BUILDS } from "./macBuilds";
import { MacBuildMenuItem } from "./MacBuildMenuItem";

type Props = { release: LatestRelease | null; isCentered: boolean; onPick: () => void };

// Both Mac builds, and how to tell which chip a Mac has.
export const MacBuildMenu = ({ release, isCentered, onPick }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={cx(
        "absolute top-[calc(100%+8px)] z-20 w-[min(300px,calc(100vw-32px))] rounded-2xl border border-line bg-surface p-1.5 text-left shadow-soft",
        isCentered ? "left-1/2 -translate-x-1/2" : "left-0",
      )}
      role="menu"
    >
      {MAC_BUILDS.map((item) => (
        <MacBuildMenuItem key={item.build} item={item} release={release} onPick={onPick} />
      ))}
      <p className="mt-1 border-t border-line px-3 pt-2 pb-1.5 text-[0.8rem] text-muted">{t("download.note")}</p>
    </div>
  );
};
