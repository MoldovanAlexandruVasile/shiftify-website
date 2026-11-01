import { RELEASES_URL } from "../config";

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {YEAR} Shiftify · A personal, non-commercial
          project. Use at your own risk.
        </span>
        <nav className="footer__links">
          <a href="./privacy.html">Privacy</a>
          <a href="./terms.html">Terms</a>
          <a href={RELEASES_URL}>All releases</a>
        </nav>
      </div>
    </footer>
  );
}
