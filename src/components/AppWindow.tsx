import { useTranslation } from "react-i18next";

const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

// The real app (captured from its web build) in a Mac window, light or dark
// following the visitor's system.
export function AppWindow() {
  const { t } = useTranslation();
  return (
    <div className="appwin">
      <div className="appwin__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <picture>
        <source srcSet={media("app/calendar-dark.jpg")} media="(prefers-color-scheme: dark)" />
        <img
          src={media("app/calendar.jpg")}
          width={1600}
          height={1000}
          alt={t("hero.appAlt")}
        />
      </picture>
    </div>
  );
}
