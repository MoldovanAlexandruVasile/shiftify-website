/** A paragraph, or a list made of consecutive "• " lines. */
export type LegalBlock = string | string[];

const BULLET = "• ";

/** Groups a section's lines into paragraphs and lists. */
export const legalBlocks = (lines: string[]): LegalBlock[] =>
  lines.reduce<LegalBlock[]>((blocks, line) => {
    if (!line.startsWith(BULLET)) return [...blocks, line];
    const item = line.slice(BULLET.length);
    const last = blocks.at(-1);
    return Array.isArray(last) ? [...blocks.slice(0, -1), [...last, item]] : [...blocks, [item]];
  }, []);
