import { useCallback, useEffect, useRef, useState } from "react";

const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

const SLIDES = [
  { file: "01-check-in", alt: "Check in in one tap: today's card logs your hours with a single click" },
  { file: "02-month-at-a-glance", alt: "Your month at a glance: hours, days off, bank holidays and pay earned so far" },
  { file: "03-fill-missing-days", alt: "Fill missed days in one go from a list of past working days" },
  { file: "04-days-off", alt: "Days off counted right: vacation, sick or unpaid leave over a range of days" },
  { file: "05-export", alt: "Send your timesheet as Excel or PDF" },
  { file: "06-dark-mode", alt: "Light, dark, or follow your Mac" },
  { file: "07-private", alt: "Private by design: no account, no server, stored on your Mac, daily backups" },
];

const AUTOPLAY_MS = 5000;

// One slide at a time. The track is a snapping scroll container, so swiping
// and trackpads work natively; arrows, dots and keys scroll it to a slide.
export function Gallery() {
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
      aria-label="Screenshots"
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
          {SLIDES.map((s, i) => (
            <div
              key={s.file}
              className="slider__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
            >
              <img src={media(`slides/${s.file}.jpg`)} alt={s.alt} width={1600} height={1000} loading={i < 2 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
        <button className="slider__arrow slider__arrow--prev" onClick={() => goTo(index - 1)} aria-label="Previous screenshot">
          <Chevron />
        </button>
        <button className="slider__arrow slider__arrow--next" onClick={() => goTo(index + 1)} aria-label="Next screenshot">
          <Chevron />
        </button>
      </div>
      <div className="slider__dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.file}
            className={`slider__dot${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Show screenshot ${i + 1}`}
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
