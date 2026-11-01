import type { ReactNode } from "react";

import { cx } from "../../utils/cx";

type Props = {
  id?: string;
  /** A light violet background, to tell sections apart. */
  isTinted?: boolean;
  /** Less space, for a section that follows the hero closely. */
  isTight?: boolean;
  children: ReactNode;
};

export const Section = ({ id, isTinted = false, isTight = false, children }: Props) => (
  <section
    id={id}
    className={cx(isTight ? "pt-6 pb-18 max-sm:pb-12" : "py-22 max-sm:py-14", isTinted && "bg-tint")}
  >
    {children}
  </section>
);
