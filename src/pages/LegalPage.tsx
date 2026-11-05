import { BackLink, Container, useDocumentTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { LegalHeading } from "../components/legal/LegalHeading";
import { LegalSection } from "../components/legal/LegalSection";
import { OtherLegalLink } from "../components/legal/OtherLegalLink";
import { useLegalDocument } from "../components/legal/useLegalDocument";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import type { LegalDocumentKind } from "../legal/types/legal.types";

type Props = { kind: LegalDocumentKind };

export const LegalPage = ({ kind }: Props) => {
  const { t } = useTranslation();
  const doc = useLegalDocument(kind);
  useDocumentTitle(t(kind === "privacy" ? "meta.privacyTitle" : "meta.termsTitle"));

  return (
    <>
      <SiteHeader home="./" download="./#download">
        <OtherLegalLink kind={kind} />
      </SiteHeader>
      <main className="flex-1 pt-12 pb-22">
        <Container isNarrow>
          <BackLink>{t("legal.back")}</BackLink>
          <LegalHeading title={doc.title} />
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
