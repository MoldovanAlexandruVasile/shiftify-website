import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

import { SLIDES, slideAt, TRACK } from "./slides";

const AUTOPLAY_MS = 5000;
const SETTLE_MS = 120;

const positionOf = (el: HTMLElement) => Math.round(el.scrollLeft / el.clientWidth);
const jumpTo = (el: HTMLElement, position: number) =>
  el.scrollTo({ left: position * el.clientWidth, behavior: "instant" });
const prefersLessMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// The slider's state: which slide is shown, scrolling to one, looping at the
// ends, and autoplay (paused while the visitor interacts).
export const useLoopingSlider = () => {
  const track = useRef<HTMLDivElement>(null);
  const settle = useRef<number>(undefined);
  // The slide shown, for the resize handler (which outlives renders).
  const shown = useRef(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // i is a slide index; -1 and SLIDES.length are the copies at either end.
  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: (i + 1) * el.clientWidth, behavior: "smooth" });
  }, []);

  // Start on the first real slide, and stay on the same one when resized.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    jumpTo(el, 1);
    const keep = new ResizeObserver(() => jumpTo(el, shown.current + 1));
    keep.observe(el);
    return () => keep.disconnect();
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    shown.current = slideAt(positionOf(el));
    setIndex(shown.current);
    // Once the scroll settles on a copy, swap to the real slide it shows.
    clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      const position = positionOf(el);
      if (position === 0) jumpTo(el, SLIDES.length);
      if (position === TRACK.length - 1) jumpTo(el, 1);
    }, SETTLE_MS);
  };

  // Autoplay, unless the visitor is interacting or prefers less motion.
  useEffect(() => {
    if (paused || prefersLessMotion()) return;
    const id = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, goTo]);

  // Arrow keys move one slide while the slider has focus.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
  };

  // Spread on the slider: autoplay waits while the visitor points at, touches or focuses it.
  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
    onPointerDown: () => setPaused(true),
  };

  return { track, index, goTo, onScroll, onKeyDown, pauseHandlers };
};
