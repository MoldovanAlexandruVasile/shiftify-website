import { Card, CardText, CardTitle, StepNumber } from "@moldovanalexandruvasile/unity-marketing";
import type { Step } from "./system";

type Props = { step: Step; number: number };

export const InstallStep = ({ step, number }: Props) => (
  <Card as="li">
    <StepNumber n={number} />
    <CardTitle>{step.title}</CardTitle>
    <CardText>{step.text}</CardText>
  </Card>
);
