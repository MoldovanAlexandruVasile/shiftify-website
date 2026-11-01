import { useTranslation } from "react-i18next";

/** How to tell an Apple Silicon Mac from an Intel one. */
export const MacBuildNote = () => {
  const { t } = useTranslation();
  return <p className="mt-1 border-t border-line px-3 pt-2 pb-1.5 text-[0.8rem] text-muted">{t("download.note")}</p>;
};
