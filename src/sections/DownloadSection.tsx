import { useTranslation } from "react-i18next";

import { DownloadButtons } from "../components/download/DownloadButtons";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import type { LatestRelease } from "../hooks/useLatestRelease";
import { assetUrl } from "../utils/media";

type Props = { release: LatestRelease | null };

// The closing call to action, at #download (where the top bar's button leads).
export const DownloadSection = ({ release }: Props) => {
  const { t } = useTranslation();
  return (
    <Section id="download">
      <Container>
        <div className="flex flex-col items-center gap-3.5 rounded-[28px] border border-line bg-linear-135 from-primary-soft to-tint px-6 py-14 text-center">
          <img className="rounded-[20px] shadow-soft" src={assetUrl("icon.png")} alt="" width={88} height={88} />
          <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold">{t("cta.title")}</h2>
          <p className="text-muted">{t("cta.text")}</p>
          <DownloadButtons release={release} layout="centered" />
        </div>
      </Container>
    </Section>
  );
};
