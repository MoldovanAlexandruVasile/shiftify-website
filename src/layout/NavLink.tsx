import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode };

/** A text link in the top bar; hidden on phones, where there's no room. */
export const NavLink = ({ href, children }: Props) => (
  <a className="hover:text-ink max-sm:hidden" href={href}>
    {children}
  </a>
);
