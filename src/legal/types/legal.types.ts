type LegalSection = {
  heading: string;
  /** Paragraphs; a line starting with "• " is shown as a bullet. */
  body: string[];
  /** Only in this build: the phone app or the desktop (Mac) app. */
  only?: "phone" | "desktop";
};

type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

type LegalDocumentKind = "privacy" | "terms";

export type { LegalDocument, LegalDocumentKind, LegalSection };
