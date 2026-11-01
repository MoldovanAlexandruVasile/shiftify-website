import type { ReactNode } from "react";

/** A small rounded label, like "Now on macOS and Windows". */
export const Pill = ({ children }: { children: ReactNode }) => (
  <span className="self-start rounded-full bg-primary-soft px-3 py-1 text-[0.8rem] font-semibold text-on-primary-soft">
    {children}
  </span>
);
