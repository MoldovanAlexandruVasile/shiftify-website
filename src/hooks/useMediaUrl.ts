import { useTranslation } from "react-i18next";

import { mediaUrl } from "../utils/media";

// Media in the page's language: public/media/ro/ holds the Romanian copies
// (same names), made by capture/ (`node capture.mjs ro`, `slides.mjs ro`, `promo.mjs ro`).
export const useMediaUrl = () => {
  const { i18n } = useTranslation();
  const folder = i18n.resolvedLanguage === "ro" ? "ro/" : "";
  return (file: string) => mediaUrl(`${folder}${file}`);
};
