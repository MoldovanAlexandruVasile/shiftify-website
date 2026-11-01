import { useTranslation } from "react-i18next";

import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { mediaUrl } from "../utils/media";

// The 25-second promo, playing muted on a loop.
export const VideoSection = () => {
  const { t } = useTranslation();
  return (
    <Section id="watch" isTight>
      <Container>
        <video
          className="block aspect-video w-full rounded-[20px] bg-[#160733] shadow-soft"
          src={mediaUrl("promo.mp4")}
          poster={mediaUrl("promo-poster.jpg")}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={t("video.label")}
        />
      </Container>
    </Section>
  );
};
