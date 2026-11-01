import { FaqQuestion } from "./FaqQuestion";

export type Question = { q: string; a: string };

type Props = { item: Question };

// A question that opens to its answer.
export const FaqItem = ({ item }: Props) => (
  <details className="group rounded-[14px] border border-line bg-surface px-5.5 py-4.5">
    <FaqQuestion>{item.q}</FaqQuestion>
    <p className="mt-2.5 text-[0.95rem] text-muted">{item.a}</p>
  </details>
);
