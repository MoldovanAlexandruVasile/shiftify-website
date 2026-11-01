import type { LatestRelease } from "../../hooks/useLatestRelease";
import { cx } from "../../utils/cx";
import { MenuPanel } from "../ui/MenuPanel";
import { MAC_BUILDS } from "./macBuilds";
import { MacBuildMenuItem } from "./MacBuildMenuItem";
import { MacBuildNote } from "./MacBuildNote";

type Props = { release: LatestRelease | null; isCentered: boolean; onPick: () => void };

// Both Mac builds, and how to tell which chip a Mac has.
export const MacBuildMenu = ({ release, isCentered, onPick }: Props) => (
  <MenuPanel
    className={cx("w-[min(300px,calc(100vw-32px))] text-left", isCentered ? "left-1/2 -translate-x-1/2" : "left-0")}
  >
    {MAC_BUILDS.map((item) => (
      <MacBuildMenuItem key={item.build} item={item} release={release} onPick={onPick} />
    ))}
    <MacBuildNote />
  </MenuPanel>
);
