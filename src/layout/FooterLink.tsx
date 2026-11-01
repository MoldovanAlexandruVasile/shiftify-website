import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode };

export const FooterLink = ({ href, children }: Props) => (
  <a className="hover:text-ink" href={href}>
    {children}
  </a>
);
