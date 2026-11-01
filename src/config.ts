// Where the .dmg is published. The Shiftify source repo is private, so the
// download is a release asset on this public website repo.
export const GITHUB_OWNER = "MoldovanAlexandruVasile";
export const GITHUB_REPO = "shiftify-website";

// Upload the .dmg to each release under this exact name so the
// "latest" link below never changes between versions.
export const DMG_ASSET_NAME = "Shiftify.dmg";

export const RELEASES_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases`;
export const DMG_URL = `${RELEASES_URL}/latest/download/${DMG_ASSET_NAME}`;
export const LATEST_RELEASE_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;
export const REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
