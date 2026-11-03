import { AppIcon } from "../components/ui/AppIcon";

type Props = { href: string };

export const Brand = ({ href }: Props) => (
  <a className="flex shrink-0 items-center gap-2.5 text-[1.1rem] font-bold max-sm:gap-2 max-sm:text-base" href={href}>
    <AppIcon size={32} className="rounded-lg" />
    Tivren
  </a>
);
