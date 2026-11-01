import { assetUrl } from "../utils/media";

type Props = { href: string };

export const Brand = ({ href }: Props) => (
  <a className="flex items-center gap-2.5 text-[1.1rem] font-bold" href={href}>
    <img className="rounded-lg" src={assetUrl("icon.png")} alt="" width={32} height={32} />
    Shiftify
  </a>
);
