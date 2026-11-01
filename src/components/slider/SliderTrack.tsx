import type { RefObject, UIEventHandler } from "react";

import { SliderSlide } from "./SliderSlide";
import { TRACK } from "./slides";

type Props = { track: RefObject<HTMLDivElement | null>; onScroll: UIEventHandler };

// The row of slides, scrolled one full width at a time (and by swiping).
export const SliderTrack = ({ track, onScroll }: Props) => (
  <div
    className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none rounded-[20px] shadow-soft outline-none focus-visible:shadow-[0_0_0_3px_var(--color-primary),var(--shadow-soft)]"
    ref={track}
    onScroll={onScroll}
    tabIndex={0}
  >
    {TRACK.map((file, position) => (
      <SliderSlide key={`${position}-${file}`} file={file} position={position} />
    ))}
  </div>
);
