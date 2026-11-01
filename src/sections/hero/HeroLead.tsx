import { useTranslation } from "react-i18next";

export const HeroLead = () => {
  const { t } = useTranslation();
  return <p className="max-w-[34em] text-[1.15rem] text-muted">{t("hero.lead")}</p>;
};
