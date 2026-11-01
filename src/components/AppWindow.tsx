import { useTranslation } from "react-i18next";

import { mediaUrl } from "../utils/media";
import { WindowControls } from "./WindowControls";

// The real app (captured from its web build) in a Mac window, light or dark
// following the visitor's system.
export const AppWindow = () => {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-surface shadow-soft">
      <WindowControls />
      <picture>
        <source srcSet={mediaUrl("app/calendar-dark.jpg")} media="(prefers-color-scheme: dark)" />
        <img className="block h-auto w-full" src={mediaUrl("app/calendar.jpg")} width={1600} height={1000} alt={t("hero.appAlt")} />
      </picture>
    </div>
  );
};
