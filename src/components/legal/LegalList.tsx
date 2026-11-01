type Props = { items: string[] };

export const LegalList = ({ items }: Props) => (
  <ul className="list-disc pl-[1.2em]">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
