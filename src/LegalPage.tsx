import { SiteFooter } from "./components/SiteFooter";
import { LEGAL_CONTACT_EMAIL, LEGAL_PUBLISHER, LEGAL_UPDATED } from "./legal/constants/legal.constants";
import { en } from "./legal/content/en";
import type { LegalDocumentKind } from "./legal/types/legal.types";

// The app's own legal texts (synced from the shiftify repo), in their Mac app
// version: the website is where the Mac app is downloaded.
const documents = en({ publisher: LEGAL_PUBLISHER, email: LEGAL_CONTACT_EMAIL, isDesktop: true });

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** A paragraph, with the contact address as a mail link. */
function Paragraph({ text }: { text: string }) {
  const at = text.indexOf(LEGAL_CONTACT_EMAIL);
  if (at === -1) return <p>{text}</p>;
  return (
    <p>
      {text.slice(0, at)}
      <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
      {text.slice(at + LEGAL_CONTACT_EMAIL.length)}
    </p>
  );
}

/** Paragraphs, with consecutive "• " lines grouped into one list. */
function Body({ lines }: { lines: string[] }) {
  const blocks: (string | string[])[] = [];
  for (const line of lines) {
    if (line.startsWith("• ")) {
      const last = blocks.at(-1);
      if (Array.isArray(last)) last.push(line.slice(2));
      else blocks.push([line.slice(2)]);
    } else {
      blocks.push(line);
    }
  }
  return blocks.map((block, i) =>
    Array.isArray(block) ? (
      <ul key={i}>
        {block.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <Paragraph key={i} text={block} />
    ),
  );
}

export default function LegalPage({ kind }: { kind: LegalDocumentKind }) {
  const doc = documents[kind];
  const sections = doc.sections.filter((s) => s.only !== "phone");
  const other = kind === "privacy" ? { href: "./terms.html", label: "Terms of use" } : { href: "./privacy.html", label: "Privacy policy" };

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <a className="brand" href="./">
            <img src={`${import.meta.env.BASE_URL}icon.png`} alt="" width={32} height={32} />
            Shiftify
          </a>
          <nav className="nav__links">
            <a href={other.href}>{other.label}</a>
            <a className="btn btn--small" href="./#download">
              Download
            </a>
          </nav>
        </div>
      </header>

      <main className="legal">
        <div className="container container--narrow">
          <a className="legal__back" href="./">
            ← Back to Shiftify
          </a>
          <h1>{doc.title}</h1>
          <p className="legal__updated">Last updated {formatDate(LEGAL_UPDATED)}</p>
          <p className="legal__intro">{doc.intro}</p>
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <Body lines={section.body} />
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
