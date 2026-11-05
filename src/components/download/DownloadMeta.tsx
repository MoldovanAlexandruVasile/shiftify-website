import { cx } from "@moldovanalexandruvasile/unity-marketing";

type Props = { text: string; isCentered?: boolean };

/** "v1.0.7 · Mac, Intel · 132 MB", under the buttons. */
export const DownloadMeta = ({ text, isCentered }: Props) => (
  <span className={cx("text-[0.85rem] text-muted", isCentered && "text-center")}>{text}</span>
);
