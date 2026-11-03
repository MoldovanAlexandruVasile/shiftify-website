import { useTranslation } from "react-i18next";

import { useMediaUrl } from "../hooks/useMediaUrl";

// The 25-second promo, playing muted on a loop (with controls for sound).
export const PromoVideo = () => {
  const { t } = useTranslation();
  const mediaUrl = useMediaUrl();
  return (
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
  );
};
