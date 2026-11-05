import { Container, ScreenshotSlider, Section, SectionTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { useMediaUrl } from "../hooks/useMediaUrl";

/** The screenshot slides, in order (public/media/slides/<name>.jpg). */
const SLIDES = [
  "01-check-in",
  "02-month-at-a-glance",
  "03-fill-missing-days",
  "04-days-off",
  "05-export",
  "06-dark-mode",
  "07-private"
];

export const ScreensSection = () => {
  const { t } = useTranslation();
  const mediaUrl = useMediaUrl();
  return (
    <Section id="screens" isTinted>
      <Container>
        <SectionTitle>{t("screens.title")}</SectionTitle>
      </Container>
      <ScreenshotSlider
        slides={SLIDES.map((file) => ({ src: mediaUrl(`slides/${file}.jpg`), alt: t(`screens.alt.${file}`) }))}
        labels={{
          region: t("screens.region"),
          previous: t("screens.previous"),
          next: t("screens.next"),
          slideOf: (n, total) => t("screens.slideOf", { n, total }),
          show: (n) => t("screens.show", { n }),
        }}
      />
    </Section>
  );
};
