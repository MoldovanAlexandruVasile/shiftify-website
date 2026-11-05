import { cx } from "@moldovanalexandruvasile/unity-marketing";

type Props = { label: string; isSelected: boolean; onClick: () => void };

export const InstallTab = ({ label, isSelected, onClick }: Props) => (
  <button
    type="button"
    role="tab"
    aria-selected={isSelected}
    className={cx(
      "cursor-pointer rounded-full px-5.5 py-2 font-semibold",
      isSelected ? "bg-primary text-on-primary" : "text-muted",
    )}
    onClick={onClick}
  >
    {label}
  </button>
);
