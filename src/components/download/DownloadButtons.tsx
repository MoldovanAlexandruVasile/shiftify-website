import { useTranslation } from "react-i18next";

import type { LatestRelease } from "../../hooks/useLatestRelease";
import { useVisitorBuild } from "../../hooks/useVisitorBuild";
import { cx } from "../../utils/cx";
import { fileSize, joinMeta } from "../../utils/downloadMeta";
import { DownloadMeta } from "./DownloadMeta";
import type { DownloadLayout } from "./layout";
import { MacDownload } from "./MacDownload";
import { WindowsDownload } from "./WindowsDownload";

type Props = { release: LatestRelease | null; layout: DownloadLayout };

// Two buttons: Mac (the visitor's chip when the browser says, else Apple
// Silicon; the arrow picks the other) and Windows. The one for the
// visitor's computer is the highlighted one.
export const DownloadButtons = ({ release, layout }: Props) => {
  const { t } = useTranslation();
  const build = useVisitorBuild();
  const isWindows = build === "win-x64";
  const isStacked = layout === "stacked";
  const meta = joinMeta([
    release ? `v${release.version}` : null,
    t(`download.builds.${build}`),
    fileSize(release, build),
  ]);

  return (
    <div className={cx("flex flex-col gap-2.5", isStacked ? "w-fit items-stretch" : "mt-2 items-center")}>
      <div className={cx("flex gap-2.5", isStacked ? "flex-col" : "flex-wrap justify-center")}>
        <MacDownload
          build={isWindows ? "mac-arm64" : build}
          release={release}
          isPrimary={!isWindows}
          layout={layout}
        />
        <WindowsDownload isPrimary={isWindows} />
      </div>
      <DownloadMeta text={meta} isCentered={isStacked} />
    </div>
  );
};
