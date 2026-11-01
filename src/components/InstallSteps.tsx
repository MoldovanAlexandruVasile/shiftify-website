import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useVisitorBuild } from "../hooks/useVisitorBuild";

type System = "mac" | "windows";
type Step = { title: string; text: string };

// Mac and Windows install differently, so each gets its own three steps.
// Opens on the visitor's system; the tabs show the other.
export function InstallSteps() {
  const { t } = useTranslation();
  const visitor: System = useVisitorBuild() === "win-x64" ? "windows" : "mac";
  const [picked, setPicked] = useState<System | null>(null);
  const system = picked ?? visitor;
  const steps = t(`install.steps.${system}`, { returnObjects: true }) as Step[];

  return (
    <>
      <div className="tabs" role="tablist" aria-label={t("install.tabs")}>
        {(["mac", "windows"] as const).map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={s === system}
            className={`tabs__tab${s === system ? " is-active" : ""}`}
            onClick={() => setPicked(s)}
          >
            {t(`install.${s}`)}
          </button>
        ))}
      </div>
      <ol className="steps" role="tabpanel">
        {steps.map((s, i) => (
          <li key={s.title} className="step">
            <span className="step__num">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
