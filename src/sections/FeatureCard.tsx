import { Card } from "../components/ui/Card";

export type Feature = { title: string; text: string };

type Props = { feature: Feature; icon: string };

export const FeatureCard = ({ feature, icon }: Props) => (
  <Card as="article">
    <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary-soft text-[1.3rem]" aria-hidden="true">
      {icon}
    </div>
    <h3 className="mb-2 text-[1.1rem] font-bold">{feature.title}</h3>
    <p className="text-[0.95rem] text-muted">{feature.text}</p>
  </Card>
);
