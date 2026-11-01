import { cx } from "../utils/cx";

export type Question = { q: string; a: string };

type Props = { item: Question };

// A question that opens to its answer; "+" turns into "−" when open.
export const FaqItem = ({ item }: Props) => (
  <details className="group rounded-[14px] border border-line bg-surface px-5.5 py-4.5">
    <summary
      className={cx(
        "flex cursor-pointer list-none justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden",
        "after:text-[1.3rem] after:leading-none after:text-primary after:content-['+'] group-open:after:content-['−']",
      )}
    >
      {item.q}
    </summary>
    <p className="mt-2.5 text-[0.95rem] text-muted">{item.a}</p>
  </details>
);
