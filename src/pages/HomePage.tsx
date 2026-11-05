import { useDocumentTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { useLatestRelease } from "../hooks/useLatestRelease";
import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { DownloadSection } from "../sections/download/DownloadSection";
import { FaqSection } from "../sections/FaqSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { HeroSection } from "../sections/hero/HeroSection";
import { HomeNavLinks } from "../sections/HomeNavLinks";
import { InstallSection } from "../sections/InstallSection";
import { ScreensSection } from "../sections/ScreensSection";
import { VideoSection } from "../sections/VideoSection";

export const HomePage = () => {
  const { t } = useTranslation();
  // Fetched once, for both sets of download buttons.
  const release = useLatestRelease();
  useDocumentTitle(t("meta.title"));

  return (
    <>
      <SiteHeader home="#top" download="#download">
        <HomeNavLinks />
      </SiteHeader>
      <main id="top" className="flex-1">
        <HeroSection release={release} />
        <VideoSection />
        <ScreensSection />
        <FeaturesSection />
        <InstallSection />
        <FaqSection />
        <DownloadSection release={release} />
      </main>
      <SiteFooter />
    </>
  );
};
