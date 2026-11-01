import { useTranslation } from "react-i18next";

import { FeatureCard, type Feature } from "./FeatureCard";

// One per feature in the translations, in the same order.
const FEATURE_ICONS = ["📅", "🏛️", "📄", "👥", "🔔", "🔒"];

export const FeatureGrid = () => {
  const { t } = useTranslation();
  const features = t("features.items", { returnObjects: true }) as Feature[];
  return (
    <div className="mt-12 max-sm:mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
      {features.map((feature, i) => (
        <FeatureCard key={feature.title} feature={feature} icon={FEATURE_ICONS[i]} />
      ))}
    </div>
  );
};
