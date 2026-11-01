import { useTranslation } from "react-i18next";

import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionLead } from "../components/ui/SectionLead";
import { SectionTitle } from "../components/ui/SectionTitle";
import { FeatureGrid } from "./FeatureGrid";

export const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <Section id="features">
      <Container>
        <SectionTitle>{t("features.title")}</SectionTitle>
        <SectionLead>{t("features.lead")}</SectionLead>
        <FeatureGrid />
      </Container>
    </Section>
  );
};
