import { useTranslation } from "react-i18next";

import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { SectionTitle } from "../components/ui/SectionTitle";
import { FaqItem, type Question } from "./FaqItem";

export const FaqSection = () => {
  const { t } = useTranslation();
  const questions = t("faq.items", { returnObjects: true }) as Question[];

  return (
    <Section id="faq">
      <Container isNarrow>
        <SectionTitle>{t("faq.title")}</SectionTitle>
        <div className="mt-10 flex flex-col gap-3">
          {questions.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
