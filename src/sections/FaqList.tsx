import { useTranslation } from "react-i18next";

import { FaqItem, type Question } from "./FaqItem";

export const FaqList = () => {
  const { t } = useTranslation();
  const questions = t("faq.items", { returnObjects: true }) as Question[];
  return (
    <div className="mt-10 flex flex-col gap-3">
      {questions.map((item) => (
        <FaqItem key={item.q} item={item} />
      ))}
    </div>
  );
};
