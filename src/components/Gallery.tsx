import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

const SLIDES = [
  "01-check-in",
  "02-month-at-a-glance",
  "03-fill-missing-days",
  "04-days-off",
  "05-export",
  "06-dark-mode",
  "07-private",
];

const AUTOPLAY_MS = 5000;

// One slide at a time. The track is a snapping scroll container, so swiping
// and trackpads work natively; arrows, dots and keys scroll it to a slide.
export function Gallery() {
  const { t } = useTranslation();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + SLIDES.length) % SLIDES.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  // Autoplay, unless the visitor is interacting or prefers less motion.
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, goTo]);

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("screens.region")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <div className="slider__viewport">
        <div className="slider__track" ref={track} onScroll={onScroll} tabIndex={0}>
          {SLIDES.map((file, i) => (
            <div
              key={file}
              className="slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={t("screens.slideOf", { n: i + 1, total: SLIDES.length })}
            >
              <img src={media(`slides/${file}.jpg`)} alt={t(`screens.alt.${file}`)} width={1600} height={1000} loading={i < 2 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
        <button className="slider__arrow slider__arrow--prev" onClick={() => goTo(index - 1)} aria-label={t("screens.previous")}>
          <Chevron />
        </button>
        <button className="slider__arrow slider__arrow--next" onClick={() => goTo(index + 1)} aria-label={t("screens.next")}>
          <Chevron />
        </button>
      </div>
      <div className="slider__dots">
        {SLIDES.map((file, i) => (
          <button
            key={file}
            className={`slider__dot${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={t("screens.show", { n: i + 1 })}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
