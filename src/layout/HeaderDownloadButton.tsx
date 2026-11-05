import { cx } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { buttonStyles } from "../components/ui/buttonStyles";

/** "Download", at the right of the top bar: jumps to the download section. */
export const HeaderDownloadButton = ({ href }: { href: string }) => {
  const { t } = useTranslation();
  return (
    <a className={cx(buttonStyles({ size: "sm" }), "max-sm:px-3.5")} href={href}>
      {t("nav.download")}
    </a>
  );
};
