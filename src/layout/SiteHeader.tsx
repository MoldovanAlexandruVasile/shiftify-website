import type { ReactNode } from "react";

import { LanguagePicker } from "../components/language/LanguagePicker";
import { Container } from "../components/ui/Container";
import { FROSTED_BAR } from "../components/ui/frostedBar";
import { cx } from "../utils/cx";
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
export const SiteHeader = ({ home, download, children }: Props) => (
  <header className={cx(FROSTED_BAR, "top-0 border-b")}>
    <Container className="flex h-16 items-center justify-between gap-3">
      <Brand href={home} />
      <nav className="flex items-center gap-6 text-[0.95rem] text-muted max-sm:gap-2">
        {children}
        <LanguagePicker />
        <HeaderDownloadButton href={download} />
      </nav>
    </Container>
  </header>
);
