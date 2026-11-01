import { useTranslation } from "react-i18next";

export const LegalBackLink = () => {
  const { t } = useTranslation();
  return (
    <a className="mb-7 inline-block text-[0.9rem] text-muted hover:text-primary" href="./">
      {t("legal.back")}
    </a>
  );
};
