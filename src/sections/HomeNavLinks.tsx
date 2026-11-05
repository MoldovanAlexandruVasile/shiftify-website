import { NavLink } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

const SECTIONS = ["screens", "features", "install", "faq"] as const;

// Links to the home page's sections, in the top bar.
export const HomeNavLinks = () => {
  const { t } = useTranslation();
  return SECTIONS.map((id) => (
    <NavLink key={id} href={`#${id}`}>
      {t(`nav.${id}`)}
    </NavLink>
  ));
};
