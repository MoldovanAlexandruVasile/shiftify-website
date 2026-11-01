import type { ReactNode } from "react";

import { cx } from "../../utils/cx";

type Props = { isNarrow?: boolean; className?: string; children: ReactNode };

/** The page's content width, with side gutters. */
export const Container = ({ isNarrow = false, className, children }: Props) => (
  <div className={cx("mx-auto px-5", isNarrow ? "max-w-[760px]" : "max-w-[1120px]", className)}>{children}</div>
);
