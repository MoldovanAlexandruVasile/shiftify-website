/** The screenshot slides, in order (public/media/slides/<name>.jpg). */
export const SLIDES = [
  "01-check-in",
  "02-month-at-a-glance",
  "03-fill-missing-days",
  "04-days-off",
  "05-export",
  "06-dark-mode",
  "07-private",
];

// The track holds a copy of the last slide before the first and a copy of the
// first after the last; landing on a copy jumps (instantly, unseen) to the
// real slide, so it loops forever in both directions, one slide at a time.
export const TRACK = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

/** The real slide shown at a track position. */
export const slideAt = (position: number) => (position - 1 + SLIDES.length) % SLIDES.length;

/** Whether a track position is one of the two copies. */
export const isCopyAt = (position: number) => position === 0 || position === TRACK.length - 1;
