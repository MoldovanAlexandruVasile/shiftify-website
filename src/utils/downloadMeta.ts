import type { Build } from "../config";
import type { LatestRelease } from "../hooks/useLatestRelease";

/** "132 MB", or null while the release (or that file) is unknown. */
export const fileSize = (release: LatestRelease | null, build: Build) => {
  const mb = release?.sizeMb[build];
  return mb ? `${mb} MB` : null;
};

/** Parts joined with " · ", skipping the missing ones. */
export const joinMeta = (parts: (string | null)[]) => parts.filter(Boolean).join(" · ");
