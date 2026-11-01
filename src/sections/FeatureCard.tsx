import { Card } from "../components/ui/Card";
import { CardText } from "../components/ui/CardText";
import { CardTitle } from "../components/ui/CardTitle";
import { IconTile } from "../components/ui/IconTile";

export type Feature = { title: string; text: string };

type Props = { feature: Feature; icon: string };

export const FeatureCard = ({ feature, icon }: Props) => (
  <Card as="article">
    <div className="mb-4">
      <IconTile>{icon}</IconTile>
    </div>
    <CardTitle>{feature.title}</CardTitle>
    <CardText>{feature.text}</CardText>
  </Card>
);
