import { legalBlocks } from "../../utils/legalBlocks";
import { LegalList } from "./LegalList";
import { LegalParagraph } from "./LegalParagraph";

type Props = { lines: string[] };

/** Paragraphs, with consecutive "• " lines shown as one list. */
export const LegalBody = ({ lines }: Props) =>
  legalBlocks(lines).map((block, i) =>
    Array.isArray(block) ? <LegalList key={i} items={block} /> : <LegalParagraph key={i} text={block} />,
  );
