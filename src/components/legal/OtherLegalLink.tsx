import { NavLink } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import type { LegalDocumentKind } from "../../legal/types/legal.types";

// From Privacy to Terms and back, in the top bar.
const OTHER = {
  privacy: { href: "./terms.html", label: "legal.terms" },
  terms: { href: "./privacy.html", label: "legal.privacy" },
} as const;

export const OtherLegalLink = ({ kind }: { kind: LegalDocumentKind }) => {
  const { t } = useTranslation();
  return <NavLink href={OTHER[kind].href}>{t(OTHER[kind].label)}</NavLink>;
};
