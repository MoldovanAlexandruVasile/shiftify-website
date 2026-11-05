import { Container, Section } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { DownloadButtons } from "../../components/download/DownloadButtons";
import { AppIcon } from "../../components/ui/AppIcon";
import type { LatestRelease } from "../../hooks/useLatestRelease";
import { CtaCard } from "./CtaCard";

type Props = { release: LatestRelease | null };

// The closing call to action, at #download (where the top bar's button leads).
export const DownloadSection = ({ release }: Props) => {
  const { t } = useTranslation();
  return (
    <Section id="download">
      <Container>
        <CtaCard>
          <AppIcon size={88} className="rounded-[20px] shadow-soft" />
          <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold">{t("cta.title")}</h2>
          <p className="text-muted">{t("cta.text")}</p>
          <DownloadButtons release={release} layout="centered" />
        </CtaCard>
      </Container>
    </Section>
  );
};
