import { ASSET_NAMES, type Build } from "../config";

export type LatestRelease = {
  version: string;
  publishedAt: string;
  sizeMb: Record<Build, number | null>;
};

type GitHubAsset = { name: string; size: number };
export type GitHubRelease = {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
};

const BUILDS = Object.keys(ASSET_NAMES) as Build[];

/** A build's file size in MB, or null if the release doesn't have it. */
const sizeOf = (release: GitHubRelease, build: Build) => {
  const file = release.assets.find((a) => a.name === ASSET_NAMES[build]);
  return file ? Math.round(file.size / 1_000_000) : null;
};

/** What the site shows of a GitHub release: version ("v1.0.7" or "v.1.0.7" → "1.0.7") and sizes. */
export const parseRelease = (release: GitHubRelease): LatestRelease => ({
  version: release.tag_name.replace(/^v\.?/, ""),
  publishedAt: release.published_at,
  sizeMb: Object.fromEntries(BUILDS.map((build) => [build, sizeOf(release, build)])) as Record<Build, number | null>,
});
