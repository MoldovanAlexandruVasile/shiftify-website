import { useTranslation } from "react-i18next";

import { SliderArrow } from "./SliderArrow";
import { SliderDots } from "./SliderDots";
import { SliderTrack } from "./SliderTrack";
import { useLoopingSlider } from "./useLoopingSlider";

// One slide at a time. The track is a snapping scroll container, so swiping
// and trackpads work natively; arrows, dots and keys scroll it to a slide.
export const ScreenshotSlider = () => {
  const { t } = useTranslation();
  const { track, index, goTo, onScroll, onKeyDown, pauseHandlers } = useLoopingSlider();

  return (
    <div
      className="mx-auto mt-10 max-w-[1080px] px-5 max-sm:mt-7"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("screens.region")}
      onKeyDown={onKeyDown}
      {...pauseHandlers}
    >
      <div className="relative">
        <SliderTrack track={track} onScroll={onScroll} />
        <SliderArrow direction="prev" label={t("screens.previous")} onClick={() => goTo(index - 1)} />
        <SliderArrow direction="next" label={t("screens.next")} onClick={() => goTo(index + 1)} />
      </div>
      <SliderDots index={index} onPick={goTo} />
    </div>
  );
};
