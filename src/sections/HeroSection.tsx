import { useTranslation } from "react-i18next";

import { AppWindow } from "../components/AppWindow";
import { DownloadButtons } from "../components/download/DownloadButtons";
import { Container } from "../components/ui/Container";
import type { LatestRelease } from "../hooks/useLatestRelease";

type Props = { release: LatestRelease | null };

export const HeroSection = ({ release }: Props) => {
  const { t } = useTranslation();
  return (
    <section className="bg-hero-glow pt-20 pb-24 max-hero:pt-12 max-hero:pb-16">
      <Container className="grid grid-cols-[0.9fr_1.1fr] items-center gap-14 max-hero:grid-cols-1">
        <div className="flex flex-col gap-5.5">
          <span className="self-start rounded-full bg-primary-soft px-3 py-1 text-[0.8rem] font-semibold text-on-primary-soft">
            {t("hero.pill")}
          </span>
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-bold">
            {t("hero.title")}{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("hero.titleAccent")}
            </span>
          </h1>
          <p className="max-w-[34em] text-[1.15rem] text-muted">{t("hero.lead")}</p>
          <DownloadButtons release={release} layout="stacked" />
        </div>
        <AppWindow />
      </Container>
    </section>
  );
};
