import { useTranslation } from "react-i18next";

import { Container } from "../components/ui/Container";
import { FROSTED_BAR } from "../components/ui/frostedBar";
import { RELEASES_URL } from "../config";
import { cx } from "../utils/cx";
import { FooterLink } from "./FooterLink";

const YEAR = new Date().getFullYear();

// Always in view at the bottom of the window, like the top bar.
export const SiteFooter = () => {
  const { t } = useTranslation();
  return (
    <footer
      className={cx(
        FROSTED_BAR,
        "bottom-0 border-t pt-3.5 pb-[max(14px,env(safe-area-inset-bottom))] text-[0.85rem] text-muted",
        "max-sm:pt-2.5 max-sm:pb-[max(10px,env(safe-area-inset-bottom))] max-sm:text-[0.8rem]",
      )}
    >
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 max-sm:flex-col max-sm:items-start max-sm:gap-1">
        <span>
          © {YEAR} Shiftify · {t("footer.note")}
        </span>
        <nav className="flex gap-5">
          <FooterLink href="./privacy.html">{t("footer.privacy")}</FooterLink>
          <FooterLink href="./terms.html">{t("footer.terms")}</FooterLink>
          <FooterLink href={RELEASES_URL}>{t("footer.releases")}</FooterLink>
        </nav>
      </Container>
    </footer>
  );
};
