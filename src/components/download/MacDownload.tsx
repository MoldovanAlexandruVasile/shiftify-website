import { useDropdown } from "@moldovanalexandruvasile/unity-marketing";
import type { LatestRelease } from "../../hooks/useLatestRelease";
import type { DownloadLayout } from "./layout";
import type { MacBuild } from "./macBuilds";
import { MacBuildMenu } from "./MacBuildMenu";
import { MacBuildToggle } from "./MacBuildToggle";
import { MacDownloadLink } from "./MacDownloadLink";

type Props = { build: MacBuild; release: LatestRelease | null; isPrimary: boolean; layout: DownloadLayout };

// "Download for Mac" for the visitor's chip, with an arrow for the other one.
export const MacDownload = ({ build, release, isPrimary, layout }: Props) => {
  const { root, isOpen, close, toggle } = useDropdown();
  return (
    <div className="relative inline-flex gap-0.5 max-sm:flex" ref={root}>
      <MacDownloadLink build={build} isPrimary={isPrimary} />
      <MacBuildToggle isPrimary={isPrimary} isOpen={isOpen} onClick={toggle} />
      {isOpen ? <MacBuildMenu release={release} isCentered={layout === "centered"} onPick={close} /> : null}
    </div>
  );
};
