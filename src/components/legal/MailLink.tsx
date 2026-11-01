export const MailLink = ({ email }: { email: string }) => (
  <a className="text-primary underline" href={`mailto:${email}`}>
    {email}
  </a>
);
