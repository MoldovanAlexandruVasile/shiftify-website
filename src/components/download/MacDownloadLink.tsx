import { useTranslation } from "react-i18next";

import { downloadUrl } from "../../config";
import { cx } from "../../utils/cx";
import { AppleIcon } from "../icons/AppleIcon";
import { buttonStyles } from "../ui/buttonStyles";
import type { MacBuild } from "./macBuilds";

type Props = { build: MacBuild; isPrimary: boolean };

/** The left half of the Mac button: downloads that build. */
export const MacDownloadLink = ({ build, isPrimary }: Props) => {
  const { t } = useTranslation();
  return (
    <a className={cx(buttonStyles({ isPrimary }), "flex-1 justify-center rounded-r-none")} href={downloadUrl(build)} download>
      <AppleIcon />
      {t("download.mac")}
    </a>
  );
};
