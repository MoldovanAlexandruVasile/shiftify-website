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

export function Gallery() {
  return (
    <div className="gallery" tabIndex={0} aria-label="Screenshots">
      {SLIDES.map((s) => (
        <img
          key={s.file}
          className="gallery__item"
          src={media(`slides/${s.file}.jpg`)}
          alt={s.alt}
          width={1600}
          height={1000}
          loading="lazy"
        />
      ))}
    </div>
  );
}
