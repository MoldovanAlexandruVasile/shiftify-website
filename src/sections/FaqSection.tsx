import { useTranslation } from "react-i18next";

import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { FaqList } from "./FaqList";

export const FaqSection = () => {
  const { t } = useTranslation();
  return (
    <Section id="faq">
      <Container isNarrow>
        <SectionTitle>{t("faq.title")}</SectionTitle>
        <FaqList />
      </Container>
    </Section>
  );
};
