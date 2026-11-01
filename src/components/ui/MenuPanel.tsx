import type { ReactNode } from "react";

import { cx } from "../../utils/cx";

type Props = { className?: string; children: ReactNode };

/** The floating box a dropdown opens, just under its toggle. Position it with className. */
export const MenuPanel = ({ className, children }: Props) => (
  <div
    className={cx("absolute top-[calc(100%+8px)] z-20 rounded-2xl border border-line bg-surface p-1.5 shadow-soft", className)}
    role="menu"
  >
    {children}
  </div>
);
