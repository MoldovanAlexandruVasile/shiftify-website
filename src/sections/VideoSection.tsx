import { Container, PromoVideo, Section } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { useMediaUrl } from "../hooks/useMediaUrl";

// The 25-second promo, playing muted on a loop (with controls for sound).
export const VideoSection = () => {
  const { t } = useTranslation();
  const mediaUrl = useMediaUrl();
  return (
    <Section id="watch" isTight>
      <Container>
        <PromoVideo
          className="bg-[#160733]"
          src={mediaUrl("promo.mp4")}
          poster={mediaUrl("promo-poster.jpg")}
          label={t("video.label")}
        />
      </Container>
    </Section>
  );
};
