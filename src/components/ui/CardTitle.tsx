import type { ReactNode } from "react";

export const CardTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-2 text-[1.1rem] font-bold">{children}</h3>
);
