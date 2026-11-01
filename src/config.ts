// Where the .dmg files are published. The Shiftify source repo is private,
// so the downloads are release assets on this public website repo.
export const GITHUB_OWNER = "MoldovanAlexandruVasile";
export const GITHUB_REPO = "shiftify-website";

// Each release has one .dmg per Mac architecture, always under these names,
// so the "latest" links below never change between versions.
export type MacArch = "arm64" | "x64";
export const dmgAssetName = (arch: MacArch) => `Shiftify-${arch}.dmg`;

export const RELEASES_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases`;
export const dmgUrl = (arch: MacArch) =>
  `${RELEASES_URL}/latest/download/${dmgAssetName(arch)}`;
export const LATEST_RELEASE_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;
export const REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
