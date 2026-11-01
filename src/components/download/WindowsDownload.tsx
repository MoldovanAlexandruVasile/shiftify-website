import { useTranslation } from "react-i18next";

import { downloadUrl } from "../../config";
import { cx } from "../../utils/cx";
import { WindowsIcon } from "../icons/WindowsIcon";
import { buttonStyles } from "../ui/buttonStyles";

type Props = { isPrimary: boolean };

export const WindowsDownload = ({ isPrimary }: Props) => {
  const { t } = useTranslation();
  return (
    <a className={cx(buttonStyles({ isPrimary }), "justify-center max-sm:w-full")} href={downloadUrl("win-x64")} download>
      <WindowsIcon />
      {t("download.windows")}
    </a>
  );
};
