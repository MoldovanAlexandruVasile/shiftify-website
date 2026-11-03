import { useTranslation } from "react-i18next";

import { useMediaUrl } from "../../hooks/useMediaUrl";
import { isCopyAt, slideAt, SLIDES } from "./slides";

type Props = { file: string; position: number };

// One slide. The two copies at the ends are hidden from screen readers.
export const SliderSlide = ({ file, position }: Props) => {
  const { t } = useTranslation();
  const mediaUrl = useMediaUrl();
  const isCopy = isCopyAt(position);
  const label = isCopy ? undefined : t("screens.slideOf", { n: slideAt(position) + 1, total: SLIDES.length });

  return (
    <div
      className="shrink-0 basis-full snap-start"
      role={isCopy ? undefined : "group"}
      aria-roledescription={isCopy ? undefined : "slide"}
      aria-label={label}
      aria-hidden={isCopy || undefined}
    >
      <img
        className="block h-auto w-full"
        src={mediaUrl(`slides/${file}.jpg`)}
        alt={isCopy ? "" : t(`screens.alt.${file}`)}
        width={1600}
        height={1000}
        loading={position <= 2 ? "eager" : "lazy"}
      />
    </div>
  );
};
