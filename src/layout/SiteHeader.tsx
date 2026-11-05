import { Container, cx, FROSTED_BAR } from "@moldovanalexandruvasile/unity-marketing";
import type { ReactNode } from "react";

import { LanguagePicker } from "../components/LanguagePicker";
import { Brand } from "./Brand";
import { HeaderDownloadButton } from "./HeaderDownloadButton";

type Props = {
  /** Where the logo and the Download button lead. */
  home: string;
  download: string;
  /** The page's own links, before the language menu. */
  children?: ReactNode;
};

// The top bar on every page: logo, the page's links, language, Download.
// On phones the nav "dissolves" (display: contents), so logo, language and
// Download share the row with equal space between all three.
export const SiteHeader = ({ home, download, children }: Props) => (
  <header className={cx(FROSTED_BAR, "top-0 border-b")}>
    <Container className="flex h-16 items-center justify-between gap-3">
      <Brand href={home} />
      <nav className="flex items-center gap-6 text-[0.95rem] text-muted max-sm:contents">
        {children}
        <LanguagePicker />
        <HeaderDownloadButton href={download} />
      </nav>
    </Container>
  </header>
);
