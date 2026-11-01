import { useTranslation } from "react-i18next";

import { cx } from "../../utils/cx";
import { SLIDES } from "./slides";

type Props = { index: number; onPick: (i: number) => void };

export const SliderDots = ({ index, onPick }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="mt-5.5 flex justify-center gap-2.5">
      {SLIDES.map((file, i) => (
        <button
          key={file}
          className={cx(
            "h-[9px] cursor-pointer rounded-full transition-[width,background-color] duration-250",
            i === index ? "w-7 bg-primary" : "w-[9px] bg-dot",
          )}
          onClick={() => onPick(i)}
          aria-label={t("screens.show", { n: i + 1 })}
          aria-current={i === index}
        />
      ))}
    </div>
  );
};
