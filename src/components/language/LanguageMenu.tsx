import { LANGUAGES, type Language } from "../../i18n";
import { MenuPanel } from "../ui/MenuPanel";
import type { LanguageOption } from "./languageOption";
import { LanguageMenuItem } from "./LanguageMenuItem";

type Props = { current: LanguageOption; onPick: (code: Language) => void };

export const LanguageMenu = ({ current, onPick }: Props) => (
  <MenuPanel className="right-0 min-w-40">
    {LANGUAGES.map((language) => (
      <LanguageMenuItem
        key={language.code}
        language={language}
        isCurrent={language.code === current.code}
        onPick={() => onPick(language.code)}
      />
    ))}
  </MenuPanel>
);
