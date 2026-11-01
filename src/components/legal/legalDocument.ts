import type { Language } from "../../i18n";
import { LEGAL_CONTACT_EMAIL, LEGAL_PUBLISHER } from "../../legal/constants/legal.constants";
import { en } from "../../legal/content/en";
import { ro } from "../../legal/content/ro";
import type { LegalDocumentKind } from "../../legal/types/legal.types";

const CONTENT = { en, ro };

// The app's own legal texts (synced from the shiftify repo), in the visitor's
// language and in their desktop app's version (Mac or Windows): the website
// is where the desktop apps are downloaded. Phone-only sections are left out.
export const legalDocument = (kind: LegalDocumentKind, language: Language, isWindows: boolean) => {
  const doc = CONTENT[language]({
    publisher: LEGAL_PUBLISHER,
    email: LEGAL_CONTACT_EMAIL,
    isDesktop: true,
    isWindows,
  })[kind];
  return { ...doc, sections: doc.sections.filter((s) => s.only !== "phone") };
};
