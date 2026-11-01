import { useTranslation } from "react-i18next";

import { downloadUrl } from "../../config";
import type { LatestRelease } from "../../hooks/useLatestRelease";
import { fileSize, joinMeta } from "../../utils/downloadMeta";
import { AppleIcon } from "../icons/AppleIcon";
import { ChipIcon } from "../icons/ChipIcon";
import type { MAC_BUILDS } from "./macBuilds";

type Props = {
  item: (typeof MAC_BUILDS)[number];
  release: LatestRelease | null;
  onPick: () => void;
};

export const MacBuildMenuItem = ({ item, release, onPick }: Props) => {
  const { t } = useTranslation();
  return (
    <a
      className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-ink hover:bg-tint focus-visible:bg-tint"
      role="menuitem"
      href={downloadUrl(item.build)}
      download
      onClick={onPick}
    >
      <span className="grid size-9 place-items-center rounded-[10px] bg-primary-soft text-on-primary-soft">
        {item.build === "mac-arm64" ? <AppleIcon /> : <ChipIcon />}
      </span>
      <span className="flex flex-col">
        <strong>{t(item.label)}</strong>
        <small className="text-[0.8rem] text-muted">{joinMeta([t(item.hint), fileSize(release, item.build)])}</small>
      </span>
    </a>
  );
};
