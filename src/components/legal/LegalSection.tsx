import type { LegalSection as Section } from "../../legal/types/legal.types";
import { LegalBody } from "./LegalBody";

type Props = { section: Section };

export const LegalSection = ({ section }: Props) => (
  <section className="mt-9">
    <h2 className="mb-2.5 text-[1.25rem] font-bold">{section.heading}</h2>
    <div className="space-y-2.5 text-muted">
      <LegalBody lines={section.body} />
    </div>
  </section>
);
