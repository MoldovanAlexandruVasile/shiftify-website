import type { ReactNode } from "react";

/** The big rounded, softly violet box of the closing call to action. */
export const CtaCard = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center gap-3.5 rounded-[28px] border border-line bg-linear-135 from-primary-soft to-tint px-6 py-14 text-center max-sm:px-4 max-sm:py-10">
    {children}
  </div>
);
