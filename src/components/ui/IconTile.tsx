import type { ReactNode } from "react";

import { cx } from "../../utils/cx";

type Props = { size?: "sm" | "md"; children: ReactNode };

/** An icon or emoji on a soft violet rounded square. */
export const IconTile = ({ size = "md", children }: Props) => (
  <span
    className={cx(
      "grid place-items-center bg-primary-soft text-on-primary-soft",
      size === "md" ? "size-11 rounded-xl text-[1.3rem]" : "size-9 rounded-[10px]",
    )}
    aria-hidden="true"
  >
    {children}
  </span>
);
