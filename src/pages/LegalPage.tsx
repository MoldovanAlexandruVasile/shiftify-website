import { useTranslation } from "react-i18next";

import { legalDocument } from "../components/legal/legalDocument";
import { LegalSection } from "../components/legal/LegalSection";
import { Container } from "../components/ui/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useVisitorBuild } from "../hooks/useVisitorBuild";
import { currentLanguage } from "../i18n";
import { NavLink } from "../layout/NavLink";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { LEGAL_UPDATED } from "../legal/constants/legal.constants";
import type { LegalDocumentKind } from "../legal/types/legal.types";
import { formatDate } from "../utils/formatDate";

type Props = { kind: LegalDocumentKind };

// The other legal page, linked from the top bar.
const OTHER = {
  privacy: { href: "./terms.html", label: "legal.terms" },
  terms: { href: "./privacy.html", label: "legal.privacy" },
} as const;

export const LegalPage = ({ kind }: Props) => {
  const { t } = useTranslation();
  const language = currentLanguage();
  const isWindows = useVisitorBuild() === "win-x64";
  const doc = legalDocument(kind, language, isWindows);
  useDocumentTitle(t(kind === "privacy" ? "meta.privacyTitle" : "meta.termsTitle"));

  return (
    <>
      <SiteHeader home="./" download="./#download">
        <NavLink href={OTHER[kind].href}>{t(OTHER[kind].label)}</NavLink>
      </SiteHeader>
      <main className="flex-1 pt-12 pb-22">
        <Container isNarrow>
          <a className="mb-7 inline-block text-[0.9rem] text-muted hover:text-primary" href="./">
            {t("legal.back")}
          </a>
          <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold">{doc.title}</h1>
          <p className="mt-2 text-[0.9rem] text-muted">
            {t("legal.updated", { date: formatDate(LEGAL_UPDATED, language) })}
          </p>
          <p className="mt-7 text-[1.1rem]">{doc.intro}</p>
          {doc.sections.map((section) => (
            <LegalSection key={section.heading} section={section} />
          ))}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
};
