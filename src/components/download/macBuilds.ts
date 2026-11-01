import type { Build } from "../../config";

export type MacBuild = Exclude<Build, "win-x64">;
export type MacBuildOption = { build: MacBuild; label: string; hint: string };

/** The two Mac builds in the menu, with their translation keys. */
export const MAC_BUILDS: MacBuildOption[] = [
  { build: "mac-arm64", label: "download.appleSilicon", hint: "download.appleSiliconHint" },
  { build: "mac-x64", label: "download.intel", hint: "download.intelHint" },
];
