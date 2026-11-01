import { cx } from "../../utils/cx";

type Options = {
  /** The filled violet button; otherwise the soft one. */
  isPrimary?: boolean;
  size?: "md" | "sm";
};

const BASE =
  "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition hover:-translate-y-px";

/** Classes for a pill button, on an <a> or a <button>. */
export const buttonStyles = ({ isPrimary = false, size = "md" }: Options = {}) =>
  cx(
    BASE,
    size === "md" ? "px-6 py-3.5 max-sm:px-4" : "px-4 py-2",
    isPrimary
      ? "bg-primary text-on-primary shadow-glow hover:bg-primary-strong"
      : "bg-primary-soft text-on-primary-soft",
  );
