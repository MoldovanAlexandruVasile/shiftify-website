import { useTranslation } from "react-i18next";

const YEAR = new Date().getFullYear();

/** "© 2026 Tivren · A personal, non-commercial project…" */
export const Copyright = () => {
  const { t } = useTranslation();
  return (
    <span>
      © {YEAR} Tivren · {t("footer.note")}
    </span>
  );
};
