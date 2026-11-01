import { PromoVideo } from "../components/PromoVideo";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";

export const VideoSection = () => (
  <Section id="watch" isTight>
    <Container>
      <PromoVideo />
    </Container>
  </Section>
);
