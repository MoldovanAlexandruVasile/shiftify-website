import { Container, Section, SectionTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { InstallSteps } from "../components/install/InstallSteps";

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
