import { LEGAL_CONTACT_EMAIL } from "../../legal/constants/legal.constants";
import { MailLink } from "./MailLink";

type Props = { text: string };

/** A paragraph, with the contact address as a mail link. */
export const LegalParagraph = ({ text }: Props) => {
  const at = text.indexOf(LEGAL_CONTACT_EMAIL);
  if (at === -1) return <p>{text}</p>;
  return (
    <p>
      {text.slice(0, at)}
      <MailLink email={LEGAL_CONTACT_EMAIL} />
      {text.slice(at + LEGAL_CONTACT_EMAIL.length)}
    </p>
  );
};
