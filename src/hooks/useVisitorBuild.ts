import { useEffect, useState } from "react";
import type { Build } from "../config";

type UserAgentData = {
  platform?: string;
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{ architecture?: string }>;
};

// The build for the visitor's computer: Windows, or the Mac's chip when the
// browser says (Chrome and Edge do; Safari and Firefox report every Mac as
// Intel, so they say nothing here). Apple Silicon when unknown, as most Macs
// today are.
export function useVisitorBuild() {
  const [build, setBuild] = useState<Build>("mac-arm64");

  useEffect(() => {
    const data = (navigator as Navigator & { userAgentData?: UserAgentData })
      .userAgentData;
    if (data?.platform === "Windows" || /Windows/.test(navigator.userAgent)) {
      setBuild("win-x64");
      return;
    }
    data
      ?.getHighEntropyValues?.(["architecture"])
      .then(({ architecture }) => {
        if (architecture === "x86") setBuild("mac-x64");
      })
      .catch(() => {});
  }, []);

  return build;
}
