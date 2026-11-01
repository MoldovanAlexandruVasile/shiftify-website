import { cx } from "../../utils/cx";

type Props = { isActive: boolean; label: string; onClick: () => void };

/** A dot under the slider; the current one stretches into a violet bar. */
export const SliderDot = ({ isActive, label, onClick }: Props) => (
  <button
    className={cx(
      "h-[9px] cursor-pointer rounded-full transition-[width,background-color] duration-250",
      isActive ? "w-7 bg-primary" : "w-[9px] bg-dot",
    )}
    onClick={onClick}
    aria-label={label}
    aria-current={isActive}
  />
);
