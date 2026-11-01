import type { ReactNode } from "react";

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-center text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold">{children}</h2>
);
