import type { ReactNode } from "react";

import { cx } from "../../utils/cx";

type Props = { as?: "article" | "li" | "div"; className?: string; children: ReactNode };

/** A white (dark: slate) rounded box with a hairline border. */
export const Card = ({ as: Tag = "div", className, children }: Props) => (
  <Tag className={cx("rounded-2xl border border-line bg-surface p-6", className)}>{children}</Tag>
);
