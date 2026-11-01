import { LEGAL_CONTACT_EMAIL } from "../../legal/constants/legal.constants";

type Props = { text: string };

/** A paragraph, with the contact address as a mail link. */
export const LegalParagraph = ({ text }: Props) => {
  const at = text.indexOf(LEGAL_CONTACT_EMAIL);
  if (at === -1) return <p>{text}</p>;
  return (
    <p>
      {text.slice(0, at)}
      <a className="text-primary underline" href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
      {text.slice(at + LEGAL_CONTACT_EMAIL.length)}
    </p>
  );
};
