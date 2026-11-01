import { useTranslation } from "react-i18next";

const YEAR = new Date().getFullYear();

/** "© 2026 Shiftify · A personal, non-commercial project…" */
export const Copyright = () => {
  const { t } = useTranslation();
  return (
    <span>
      © {YEAR} Shiftify · {t("footer.note")}
    </span>
  );
};
