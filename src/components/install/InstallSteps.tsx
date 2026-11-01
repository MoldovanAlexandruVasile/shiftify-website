import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useVisitorBuild } from "../../hooks/useVisitorBuild";
import { InstallStep } from "./InstallStep";
import { InstallTabs } from "./InstallTabs";
import type { Step, System } from "./system";

// Mac and Windows install differently, so each gets its own three steps.
// Opens on the visitor's system; the tabs show the other.
export const InstallSteps = () => {
  const { t } = useTranslation();
  const visitor: System = useVisitorBuild() === "win-x64" ? "windows" : "mac";
  const [picked, setPicked] = useState<System | null>(null);
  const system = picked ?? visitor;
  const steps = t(`install.steps.${system}`, { returnObjects: true }) as Step[];

  return (
    <>
      <InstallTabs system={system} onPick={setPicked} />
      <ol className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5" role="tabpanel">
        {steps.map((step, i) => (
          <InstallStep key={step.title} step={step} number={i + 1} />
        ))}
      </ol>
    </>
  );
};
