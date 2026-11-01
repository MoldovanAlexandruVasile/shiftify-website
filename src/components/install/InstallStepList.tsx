import { useTranslation } from "react-i18next";

import { InstallStep } from "./InstallStep";
import type { Step, System } from "./system";

type Props = { system: System };

export const InstallStepList = ({ system }: Props) => {
  const { t } = useTranslation();
  const steps = t(`install.steps.${system}`, { returnObjects: true }) as Step[];
  return (
    <ol className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5" role="tabpanel">
      {steps.map((step, i) => (
        <InstallStep key={step.title} step={step} number={i + 1} />
      ))}
    </ol>
  );
};
