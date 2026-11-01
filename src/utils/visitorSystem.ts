type UserAgentData = {
  platform?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
};

const userAgentData = () => (navigator as Navigator & { userAgentData?: UserAgentData }).userAgentData;

/** Whether the browser runs on Windows. */
export const isWindowsVisitor = () =>
  userAgentData()?.platform === "Windows" || /Windows/.test(navigator.userAgent);

/**
 * Whether the browser says the Mac is Intel. Chrome and Edge tell; Safari and
 * Firefox report every Mac as Intel, so they say nothing here (false).
 */
export const isIntelMacVisitor = async () => {
  try {
    const { architecture } = (await userAgentData()?.getHighEntropyValues?.(["architecture"])) ?? {};
    return architecture === "x86";
  } catch {
    return false;
  }
};
