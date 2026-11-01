import { useEffect, useState } from "react";
import type { MacArch } from "../config";

type UserAgentData = {
  getHighEntropyValues?: (
    hints: string[],
  ) => Promise<{ architecture?: string }>;
};

// The visitor's Mac, when the browser says (Chrome and Edge do; Safari and
// Firefox report every Mac as Intel, so they say nothing here). Null when
// unknown: Apple Silicon is then offered first, as most Macs today are.
export function useMacArch() {
  const [arch, setArch] = useState<MacArch | null>(null);

  useEffect(() => {
    const data = (navigator as Navigator & { userAgentData?: UserAgentData })
      .userAgentData;
    data
      ?.getHighEntropyValues?.(["architecture"])
      .then(({ architecture }) => {
        if (architecture === "arm") setArch("arm64");
        else if (architecture === "x86") setArch("x64");
      })
      .catch(() => {});
  }, []);

  return arch;
}
