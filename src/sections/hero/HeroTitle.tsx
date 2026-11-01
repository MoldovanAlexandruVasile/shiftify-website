import { useTranslation } from "react-i18next";

// "Timesheets for freelancers, without the spreadsheet." — the second half in a violet gradient.
export const HeroTitle = () => {
  const { t } = useTranslation();
  return (
    <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-bold">
      {t("hero.title")}{" "}
      <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
        {t("hero.titleAccent")}
      </span>
    </h1>
  );
};
