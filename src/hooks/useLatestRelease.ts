import { useEffect, useState } from "react";

import { LATEST_RELEASE_API } from "../config";
import { parseRelease, type GitHubRelease, type LatestRelease } from "../utils/parseRelease";

export type { LatestRelease };

// Version and sizes shown next to the download buttons. The buttons work
// without it (they link to /releases/latest), so failures are silent.
export const useLatestRelease = () => {
  const [release, setRelease] = useState<LatestRelease | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(LATEST_RELEASE_API, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<GitHubRelease>) : null))
      .then((data) => {
        if (data) setRelease(parseRelease(data));
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return release;
};
