import { Copyright, FooterLink, FooterLinks, SiteFooter as Footer } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { RELEASES_URL } from "../config";

// In view at the bottom of the window, like the top bar; on phones it just ends the page.
export const SiteFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer
      start={<Copyright brand="Tivren" note={t("footer.note")} />}
      end={
        <FooterLinks>
          <FooterLink href="./privacy.html">{t("footer.privacy")}</FooterLink>
          <FooterLink href="./terms.html">{t("footer.terms")}</FooterLink>
          <FooterLink href={RELEASES_URL}>{t("footer.releases")}</FooterLink>
        </FooterLinks>
      }
    />
  );
};
