import { useTranslation } from "react-i18next";

import { currentLanguage } from "../../i18n";
import { LEGAL_UPDATED } from "../../legal/constants/legal.constants";
import { formatDate } from "../../utils/formatDate";

type Props = { title: string };

// The document's title and when it last changed.
export const LegalHeading = ({ title }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold">{title}</h1>
      <p className="mt-2 text-[0.9rem] text-muted">
        {t("legal.updated", { date: formatDate(LEGAL_UPDATED, currentLanguage()) })}
      </p>
    </>
  );
};
