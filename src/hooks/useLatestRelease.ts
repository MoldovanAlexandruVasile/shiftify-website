import { useEffect, useState } from "react";
import { DMG_ASSET_NAME, LATEST_RELEASE_API } from "../config";

export type LatestRelease = {
  version: string;
  publishedAt: string;
  sizeMb: number | null;
};

type GitHubAsset = { name: string; size: number };
type GitHubRelease = { tag_name: string; published_at: string; assets: GitHubAsset[] };

// Version and size shown next to the download button. The button works
// without it (it links to /releases/latest), so failures are silent.
export function useLatestRelease() {
  const [release, setRelease] = useState<LatestRelease | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(LATEST_RELEASE_API, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<GitHubRelease>) : null))
      .then((data) => {
        if (!data) return;
        const dmg = data.assets.find((a) => a.name === DMG_ASSET_NAME);
        setRelease({
          version: data.tag_name.replace(/^v/, ""),
          publishedAt: data.published_at,
          sizeMb: dmg ? Math.round(dmg.size / 1_000_000) : null,
        });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return release;
}
