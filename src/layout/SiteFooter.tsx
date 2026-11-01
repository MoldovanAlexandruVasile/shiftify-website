import { Container } from "../components/ui/Container";
import { FROSTED_BAR } from "../components/ui/frostedBar";
import { cx } from "../utils/cx";
import { Copyright } from "./Copyright";
import { FooterLinks } from "./FooterLinks";

// Always in view at the bottom of the window, like the top bar; two rows on phones.
export const SiteFooter = () => (
  <footer
    className={cx(
      FROSTED_BAR,
      "bottom-0 border-t pt-3.5 pb-[max(14px,env(safe-area-inset-bottom))] text-[0.85rem] text-muted",
      "max-sm:pt-2.5 max-sm:pb-[max(10px,env(safe-area-inset-bottom))] max-sm:text-[0.8rem]",
    )}
  >
    <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 max-sm:flex-col max-sm:items-start max-sm:gap-1">
      <Copyright />
      <FooterLinks />
    </Container>
  </footer>
);
