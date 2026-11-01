import { useEffect, useState } from "react";
import { ASSET_NAMES, LATEST_RELEASE_API, type Build } from "../config";

export type LatestRelease = {
  version: string;
  publishedAt: string;
  sizeMb: Record<Build, number | null>;
};

type GitHubAsset = { name: string; size: number };
type GitHubRelease = {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
};

// Version and sizes shown next to the download buttons. The buttons work
// without it (they link to /releases/latest), so failures are silent.
export function useLatestRelease() {
  const [release, setRelease] = useState<LatestRelease | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(LATEST_RELEASE_API, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<GitHubRelease>) : null))
      .then((data) => {
        if (!data) return;
        const sizeOf = (build: Build) => {
          const file = data.assets.find((a) => a.name === ASSET_NAMES[build]);
          return file ? Math.round(file.size / 1_000_000) : null;
        };
        setRelease({
          version: data.tag_name.replace(/^v\.?/, ""),
          publishedAt: data.published_at,
          sizeMb: {
            "mac-arm64": sizeOf("mac-arm64"),
            "mac-x64": sizeOf("mac-x64"),
            "win-x64": sizeOf("win-x64"),
          },
        });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return release;
}
