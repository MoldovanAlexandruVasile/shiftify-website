import { Container, FeatureGrid, Section, SectionLead, SectionTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

// One per feature in the translations, in the same order.
const FEATURE_ICONS = ["📅","🏛️","📄","👥","🔔","🔒"];

type FeatureCopy = { title: string; text: string };

export const FeaturesSection = () => {
  const { t } = useTranslation();
  const copy = t("features.items", { returnObjects: true }) as FeatureCopy[];
  return (
    <Section id="features">
      <Container>
        <SectionTitle>{t("features.title")}</SectionTitle>
        <SectionLead>{t("features.lead")}</SectionLead>
        <FeatureGrid features={copy.map((feature, i) => ({ ...feature, icon: FEATURE_ICONS[i] }))} />
      </Container>
    </Section>
  );
};
