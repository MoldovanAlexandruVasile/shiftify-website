import { useEffect, useState } from "react";
import { LATEST_RELEASE_API, dmgAssetName, type MacArch } from "../config";

export type LatestRelease = {
  version: string;
  publishedAt: string;
  sizeMb: Record<MacArch, number | null>;
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
        const sizeOf = (arch: MacArch) => {
          const dmg = data.assets.find((a) => a.name === dmgAssetName(arch));
          return dmg ? Math.round(dmg.size / 1_000_000) : null;
        };
        setRelease({
          version: data.tag_name.replace(/^v\.?/, ""),
          publishedAt: data.published_at,
          sizeMb: { arm64: sizeOf("arm64"), x64: sizeOf("x64") },
        });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return release;
}
