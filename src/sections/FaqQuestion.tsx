import type { ReactNode } from "react";

import { cx } from "../utils/cx";

// The clickable question; "+" turns into "−" when its <details> is open.
export const FaqQuestion = ({ children }: { children: ReactNode }) => (
  <summary
    className={cx(
      "flex cursor-pointer list-none justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden",
      "after:text-[1.3rem] after:leading-none after:text-primary after:content-['+'] group-open:after:content-['−']",
    )}
  >
    {children}
  </summary>
);
