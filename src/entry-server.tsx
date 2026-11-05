import { renderToString } from "react-dom/server";

import "./i18n";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";

export type Page = "home" | "privacy" | "terms";

// Each page's HTML, in English, written into the built pages by
// scripts/prerender.mjs. Search engines and link previews read it without
// running JavaScript; in the browser, React then takes over the page.
export const render = (page: Page) =>
  renderToString(page === "home" ? <HomePage /> : <LegalPage kind={page} />);
