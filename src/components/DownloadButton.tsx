import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { downloadUrl, type Build } from "../config";
import type { LatestRelease } from "../hooks/useLatestRelease";
import { useVisitorBuild } from "../hooks/useVisitorBuild";

type Props = { release: LatestRelease | null; size?: "lg" | "md" };
type MacBuild = Exclude<Build, "win-x64">;

const MAC_BUILDS: { build: MacBuild; label: string; hint: string }[] = [
  { build: "mac-arm64", label: "download.appleSilicon", hint: "download.appleSiliconHint" },
  { build: "mac-x64", label: "download.intel", hint: "download.intelHint" },
];

// Two buttons: Mac (the visitor's chip when the browser says, else Apple
// Silicon; the arrow picks the other) and Windows. The one for the
// visitor's computer is the highlighted one.
export function DownloadButton({ release, size = "lg" }: Props) {
  const { t } = useTranslation();
  const build = useVisitorBuild();
  const isWindows = build === "win-x64";
  const macBuild: MacBuild = isWindows ? "mac-arm64" : build;
  const [isOpen, setIsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const sizeOf = (of: Build) => {
    const mb = release?.sizeMb[of];
    return mb ? `${mb} MB` : null;
  };
  const meta = [
    release ? `v${release.version}` : null,
    t(`download.builds.${build}`),
    sizeOf(build),
  ]
    .filter(Boolean)
    .join(" · ");
  const macStyle = isWindows ? "btn" : "btn btn--primary";
  const windowsStyle = isWindows ? "btn btn--primary" : "btn";

  return (
    <div className={`download download--${size}`}>
      <div className="download__buttons">
        <div className="split" ref={root}>
          <a
            className={`${macStyle} split__main`}
            href={downloadUrl(macBuild)}
            download
          >
            <AppleIcon />
            {t("download.mac")}
          </a>
          <button
            type="button"
            className={`${macStyle} split__toggle`}
            aria-label={t("download.chooseMac")}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <ChevronIcon />
          </button>
          {isOpen ? (
            <div className="split__menu" role="menu">
              {MAC_BUILDS.map((item) => (
                <a
                  key={item.build}
                  className="split__item"
                  role="menuitem"
                  href={downloadUrl(item.build)}
                  download
                  onClick={() => setIsOpen(false)}
                >
                  <span className="split__icon">
                    {item.build === "mac-arm64" ? <AppleIcon /> : <ChipIcon />}
                  </span>
                  <span className="split__text">
                    <strong>{t(item.label)}</strong>
                    <small>
                      {[t(item.hint), sizeOf(item.build)]
                        .filter(Boolean)
                        .join(" · ")}
                    </small>
                  </span>
                </a>
              ))}
              <p className="split__note">
                {t("download.note")}
              </p>
            </div>
          ) : null}
        </div>
        <a className={windowsStyle} href={downloadUrl("win-x64")} download>
          <WindowsIcon />
          {t("download.windows")}
        </a>
      </div>
      <span className="download__meta">{meta}</span>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.39-.92-2.41-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.96 2.79 1.02.08 2.05-.52 2.68-1.27z" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 5.5 10.5 4.5v7H3zM11.5 4.4 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.4z" />
    </svg>
  );
}

function ChipIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
