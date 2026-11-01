import { cx } from "../../utils/cx";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";

type Props = { direction: "prev" | "next"; label: string; onClick: () => void };

// Round arrows half outside the slide on wide screens, inside it on narrower ones,
// and none on phones, where swiping and the dots do the job.
const SIDE = {
  prev: "-left-6 max-wide:left-2 [&_svg]:rotate-180",
  next: "-right-6 max-wide:right-2",
};

export const SliderArrow = ({ direction, label, onClick }: Props) => (
  <button
    className={cx(
      "absolute top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink shadow-float transition hover:scale-106 hover:text-primary max-sm:hidden",
      SIDE[direction],
    )}
    onClick={onClick}
    aria-label={label}
  >
    <ChevronRightIcon />
  </button>
);
