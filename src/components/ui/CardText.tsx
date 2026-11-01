import type { ReactNode } from "react";

export const CardText = ({ children }: { children: ReactNode }) => (
  <p className="text-[0.95rem] text-muted">{children}</p>
);
