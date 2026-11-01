import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import { SliderArrow } from "./SliderArrow";
import { SliderDots } from "./SliderDots";
import { SliderSlide } from "./SliderSlide";
import { TRACK } from "./slides";
import { useLoopingSlider } from "./useLoopingSlider";

// One slide at a time. The track is a snapping scroll container, so swiping
// and trackpads work natively; arrows, dots and keys scroll it to a slide.
export const ScreenshotSlider = () => {
  const { t } = useTranslation();
  const { track, index, goTo, onScroll, setPaused } = useLoopingSlider();

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
  };

  return (
    <div
      className="mx-auto mt-10 max-w-[1080px] px-5"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("screens.region")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onKeyDown={onKeyDown}
    >
      <div className="relative">
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
        <SliderArrow direction="prev" label={t("screens.previous")} onClick={() => goTo(index - 1)} />
        <SliderArrow direction="next" label={t("screens.next")} onClick={() => goTo(index + 1)} />
      </div>
      <SliderDots index={index} onPick={goTo} />
    </div>
  );
};
