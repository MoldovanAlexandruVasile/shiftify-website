import { Card } from "../ui/Card";
import type { Step } from "./system";

type Props = { step: Step; number: number };

export const InstallStep = ({ step, number }: Props) => (
  <Card as="li">
    <span className="mb-3.5 grid size-[34px] place-items-center rounded-full bg-primary font-bold text-on-primary">
      {number}
    </span>
    <h3 className="mb-2 text-[1.1rem] font-bold">{step.title}</h3>
    <p className="text-[0.95rem] text-muted">{step.text}</p>
  </Card>
);
