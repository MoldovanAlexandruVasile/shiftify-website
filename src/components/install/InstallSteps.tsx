import { InstallStepList } from "./InstallStepList";
import { InstallTabs } from "./InstallTabs";
import { useInstallSystem } from "./useInstallSystem";

// Mac and Windows install differently, so each gets its own three steps.
// Opens on the visitor's system; the tabs show the other.
export const InstallSteps = () => {
  const { system, pick } = useInstallSystem();
  return (
    <>
      <InstallTabs system={system} onPick={pick} />
      <InstallStepList system={system} />
    </>
  );
};
