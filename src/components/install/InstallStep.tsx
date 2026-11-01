import { Card } from "../ui/Card";
import { CardText } from "../ui/CardText";
import { CardTitle } from "../ui/CardTitle";
import { StepNumber } from "../ui/StepNumber";
import type { Step } from "./system";

type Props = { step: Step; number: number };

export const InstallStep = ({ step, number }: Props) => (
  <Card as="li">
    <StepNumber n={number} />
    <CardTitle>{step.title}</CardTitle>
    <CardText>{step.text}</CardText>
  </Card>
);
