import type { ReactNode } from "react";

export const SectionLead = ({ children }: { children: ReactNode }) => (
  <p className="mt-2.5 text-center text-muted">{children}</p>
);
