import { useTranslation } from "react-i18next";

import { SliderDot } from "./SliderDot";
import { SLIDES } from "./slides";

type Props = { index: number; onPick: (i: number) => void };

export const SliderDots = ({ index, onPick }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="mt-5.5 flex justify-center gap-2.5">
      {SLIDES.map((file, i) => (
        <SliderDot key={file} isActive={i === index} label={t("screens.show", { n: i + 1 })} onClick={() => onPick(i)} />
      ))}
    </div>
  );
};
