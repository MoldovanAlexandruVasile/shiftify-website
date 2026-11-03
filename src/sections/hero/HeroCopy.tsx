import { useTranslation } from "react-i18next";

import { DownloadButtons } from "../../components/download/DownloadButtons";
import { Pill } from "../../components/ui/Pill";
import type { LatestRelease } from "../../hooks/useLatestRelease";
import { HeroLead } from "./HeroLead";
import { HeroTitle } from "./HeroTitle";

type Props = { release: LatestRelease | null };

// The hero's left column: what Tivren is, and the download buttons.
export const HeroCopy = ({ release }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5.5">
      <Pill>{t("hero.pill")}</Pill>
      <HeroTitle />
      <HeroLead />
      <DownloadButtons release={release} layout="stacked" />
    </div>
  );
};
