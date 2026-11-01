import { useTranslation } from "react-i18next";

import { NavLink } from "../layout/NavLink";

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
