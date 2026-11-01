import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { downloadUrl } from "../../config";
import { useDismiss } from "../../hooks/useDismiss";
import type { LatestRelease } from "../../hooks/useLatestRelease";
import { cx } from "../../utils/cx";
import { AppleIcon } from "../icons/AppleIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { buttonStyles } from "../ui/buttonStyles";
import type { DownloadLayout } from "./layout";
import type { MacBuild } from "./macBuilds";
import { MacBuildMenu } from "./MacBuildMenu";

type Props = { build: MacBuild; release: LatestRelease | null; isPrimary: boolean; layout: DownloadLayout };

// "Download for Mac" for the visitor's chip, with an arrow for the other one.
export const MacDownload = ({ build, release, isPrimary, layout }: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useDismiss(root, isOpen, close);

  const button = buttonStyles({ isPrimary });

  return (
    <div className="relative inline-flex gap-0.5" ref={root}>
      <a className={cx(button, "flex-1 justify-center rounded-r-none")} href={downloadUrl(build)} download>
        <AppleIcon />
        {t("download.mac")}
      </a>
      <button
        type="button"
        className={cx(
          button,
          "cursor-pointer rounded-l-none px-4 [&_svg]:transition-transform aria-expanded:[&_svg]:rotate-180",
        )}
        aria-label={t("download.chooseMac")}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <ChevronDownIcon />
      </button>
      {isOpen ? <MacBuildMenu release={release} isCentered={layout === "centered"} onPick={close} /> : null}
    </div>
  );
};
