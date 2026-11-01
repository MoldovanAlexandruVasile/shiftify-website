import { useTranslation } from "react-i18next";

import { InstallSteps } from "../components/install/InstallSteps";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";

export const InstallSection = () => {
  const { t } = useTranslation();
  return (
    <Section id="install" isTinted>
      <Container>
        <SectionTitle>{t("install.title")}</SectionTitle>
        <InstallSteps />
      </Container>
    </Section>
  );
};
