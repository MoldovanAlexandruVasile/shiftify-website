import { AppIcon } from "../components/ui/AppIcon";

type Props = { href: string };

export const Brand = ({ href }: Props) => (
  <a className="flex items-center gap-2.5 text-[1.1rem] font-bold" href={href}>
    <AppIcon size={32} className="rounded-lg" />
    Shiftify
  </a>
);
