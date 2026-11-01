import { useTranslation } from "react-i18next";

import type { Build } from "../../config";
import type { LatestRelease } from "../../hooks/useLatestRelease";
import { fileSize, joinMeta } from "../../utils/downloadMeta";

/** "v1.0.7 · Mac, Intel · 132 MB" for a build; parts not known yet are left out. */
export const useDownloadMeta = (release: LatestRelease | null, build: Build) => {
  const { t } = useTranslation();
  return joinMeta([release ? `v${release.version}` : null, t(`download.builds.${build}`), fileSize(release, build)]);
};
