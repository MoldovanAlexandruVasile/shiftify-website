import { useTranslation } from "react-i18next";

import { cx } from "../../utils/cx";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { buttonStyles } from "../ui/buttonStyles";

type Props = { isPrimary: boolean; isOpen: boolean; onClick: () => void };

/** The right half of the Mac button: the arrow that opens both builds. */
export const MacBuildToggle = ({ isPrimary, isOpen, onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className={cx(
        buttonStyles({ isPrimary }),
        "cursor-pointer rounded-l-none px-4 [&_svg]:transition-transform aria-expanded:[&_svg]:rotate-180",
      )}
      aria-label={t("download.chooseMac")}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <ChevronDownIcon />
    </button>
  );
};
