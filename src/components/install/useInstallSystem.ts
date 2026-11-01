import { useState } from "react";

import { useVisitorBuild } from "../../hooks/useVisitorBuild";
import type { System } from "./system";

// The system whose steps are shown: the visitor's own, until they pick a tab.
export const useInstallSystem = () => {
  const visitor: System = useVisitorBuild() === "win-x64" ? "windows" : "mac";
  const [picked, setPicked] = useState<System | null>(null);
  return { system: picked ?? visitor, pick: setPicked };
};
