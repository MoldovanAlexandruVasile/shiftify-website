import { useVisitorBuild } from "../../hooks/useVisitorBuild";
import { currentLanguage } from "../../i18n";
import type { LegalDocumentKind } from "../../legal/types/legal.types";
import { legalDocument } from "./legalDocument";

/** The document in the site's language, in the visitor's desktop app's version. */
export const useLegalDocument = (kind: LegalDocumentKind) => {
  const isWindows = useVisitorBuild() === "win-x64";
  return legalDocument(kind, currentLanguage(), isWindows);
};
