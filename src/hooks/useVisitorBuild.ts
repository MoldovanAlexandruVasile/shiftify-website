import { useEffect, useState } from "react";

import type { Build } from "../config";
import { isIntelMacVisitor, isWindowsVisitor } from "../utils/visitorSystem";

// The build for the visitor's computer: Windows, or the Mac's chip when the
// browser says. Apple Silicon when unknown, as most Macs today are.
export const useVisitorBuild = () => {
  const [build, setBuild] = useState<Build>(() => (isWindowsVisitor() ? "win-x64" : "mac-arm64"));

  useEffect(() => {
    if (build === "win-x64") return;
    let isCurrent = true;
    isIntelMacVisitor().then((isIntel) => {
      if (isIntel && isCurrent) setBuild("mac-x64");
    });
    return () => {
      isCurrent = false;
    };
  }, [build]);

  return build;
};
