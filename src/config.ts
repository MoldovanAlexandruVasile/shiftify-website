// Where the downloads are published. The Shiftify source repo is private,
// so they are release assets on this public website repo.
export const GITHUB_OWNER = "MoldovanAlexandruVasile";
export const GITHUB_REPO = "shiftify-website";

// Each release has these files, always under these names, so the "latest"
// links below never change between versions.
export type Build = "mac-arm64" | "mac-x64" | "win-x64";
export const ASSET_NAMES: Record<Build, string> = {
  "mac-arm64": "Shiftify-arm64.dmg",
  "mac-x64": "Shiftify-x64.dmg",
  "win-x64": "Shiftify-Setup-x64.exe",
};

export const RELEASES_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases`;
export const downloadUrl = (build: Build) =>
  `${RELEASES_URL}/latest/download/${ASSET_NAMES[build]}`;
export const LATEST_RELEASE_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;
export const REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
