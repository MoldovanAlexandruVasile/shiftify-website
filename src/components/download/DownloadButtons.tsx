import type { LatestRelease } from "../../hooks/useLatestRelease";
import { useVisitorBuild } from "../../hooks/useVisitorBuild";
import { cx } from "../../utils/cx";
import { DownloadMeta } from "./DownloadMeta";
import type { DownloadLayout } from "./layout";
import { MacDownload } from "./MacDownload";
import { useDownloadMeta } from "./useDownloadMeta";
import { WindowsDownload } from "./WindowsDownload";

type Props = { release: LatestRelease | null; layout: DownloadLayout };

// Two buttons: Mac (the visitor's chip when the browser says, else Apple
// Silicon; the arrow picks the other) and Windows. The one for the
// visitor's computer is the highlighted one. On phones both layouts become
// full-width buttons, one under the other, which are easier to tap.
export const DownloadButtons = ({ release, layout }: Props) => {
  const build = useVisitorBuild();
  const meta = useDownloadMeta(release, build);
  const isWindows = build === "win-x64";
  const isStacked = layout === "stacked";

  return (
    <div
      className={cx(
        "flex flex-col gap-2.5 max-sm:w-full max-sm:items-stretch",
        isStacked ? "w-fit items-stretch" : "mt-2 items-center",
      )}
    >
      <div className={cx("flex gap-2.5 max-sm:flex-col", isStacked ? "flex-col" : "flex-wrap justify-center")}>
        <MacDownload
          build={isWindows ? "mac-arm64" : build}
          release={release}
          isPrimary={!isWindows}
          layout={layout}
        />
        <WindowsDownload isPrimary={isWindows} />
      </div>
      <DownloadMeta text={meta} isCentered />
    </div>
  );
};
