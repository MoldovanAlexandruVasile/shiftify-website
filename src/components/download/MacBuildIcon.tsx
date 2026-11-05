import { AppleIcon } from "@moldovanalexandruvasile/unity-marketing";
import { ChipIcon } from "../icons/ChipIcon";
import type { MacBuild } from "./macBuilds";

/** The Apple logo for Apple Silicon, a chip for Intel. */
export const MacBuildIcon = ({ build }: { build: MacBuild }) =>
  build === "mac-arm64" ? <AppleIcon /> : <ChipIcon />;
