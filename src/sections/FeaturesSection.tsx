import { useTranslation } from "react-i18next";

import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionLead } from "../components/ui/SectionLead";
import { SectionTitle } from "../components/ui/SectionTitle";
import { FeatureCard, type Feature } from "./FeatureCard";

// One per feature in the translations, in the same order.
const FEATURE_ICONS = ["📅", "🏛️", "📄", "👥", "🔔", "🔒"];

export const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = t("features.items", { returnObjects: true }) as Feature[];

  return (
    <Section id="features">
      <Container>
        <SectionTitle>{t("features.title")}</SectionTitle>
        <SectionLead>{t("features.lead")}</SectionLead>
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} icon={FEATURE_ICONS[i]} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
