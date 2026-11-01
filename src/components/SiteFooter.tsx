import { useTranslation } from "react-i18next";

import { RELEASES_URL } from "../config";

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {YEAR} Shiftify · {t("footer.note")}
        </span>
        <nav className="footer__links">
          <a href="./privacy.html">{t("footer.privacy")}</a>
          <a href="./terms.html">{t("footer.terms")}</a>
          <a href={RELEASES_URL}>{t("footer.releases")}</a>
        </nav>
      </div>
    </footer>
  );
}
