import { Container, FaqList, Section, SectionTitle, type Question } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

export const FaqSection = () => {
  const { t } = useTranslation();
  return (
    <Section id="faq">
      <Container isNarrow>
        <SectionTitle>{t("faq.title")}</SectionTitle>
        <FaqList items={t("faq.items", { returnObjects: true }) as Question[]} />
      </Container>
    </Section>
  );
};
