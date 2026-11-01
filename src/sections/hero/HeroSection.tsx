import { AppWindow } from "../../components/AppWindow";
import { Container } from "../../components/ui/Container";
import type { LatestRelease } from "../../hooks/useLatestRelease";
import { HeroCopy } from "./HeroCopy";

type Props = { release: LatestRelease | null };

// Text and buttons beside the app's screen; stacked on narrow screens.
export const HeroSection = ({ release }: Props) => (
  <section className="bg-hero-glow pt-20 pb-24 max-hero:pt-12 max-hero:pb-16">
    <Container className="grid grid-cols-[0.9fr_1.1fr] items-center gap-14 max-hero:grid-cols-1">
      <HeroCopy release={release} />
      <AppWindow />
    </Container>
  </section>
);
