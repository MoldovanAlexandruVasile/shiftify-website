import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AppWindow } from "./components/AppWindow";
import { DownloadButton } from "./components/DownloadButton";
import { Gallery } from "./components/Gallery";
import { InstallSteps } from "./components/InstallSteps";
import { LanguagePicker } from "./components/LanguagePicker";
import { SiteFooter } from "./components/SiteFooter";
import { useLatestRelease } from "./hooks/useLatestRelease";

const FEATURE_ICONS = ["📅", "🏛️", "📄", "👥", "🔔", "🔒"];

type Feature = { title: string; text: string };
type Question = { q: string; a: string };

export default function App() {
  const { t } = useTranslation();
  const release = useLatestRelease();
  const features = t("features.items", { returnObjects: true }) as Feature[];
  const faq = t("faq.items", { returnObjects: true }) as Question[];

  useEffect(() => {
    document.title = t("meta.title");
  }, [t]);

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <a className="brand" href="#top">
            <img
              src={`${import.meta.env.BASE_URL}icon.png`}
              alt=""
              width={32}
              height={32}
            />
            Shiftify
          </a>
          <nav className="nav__links">
            <a href="#screens">{t("nav.screens")}</a>
            <a href="#features">{t("nav.features")}</a>
            <a href="#install">{t("nav.install")}</a>
            <a href="#faq">{t("nav.faq")}</a>
            <LanguagePicker />
            <a className="btn btn--small" href="#download">
              {t("nav.download")}
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <span className="pill">{t("hero.pill")}</span>
              <h1>
                {t("hero.title")}{" "}
                <span className="grad">{t("hero.titleAccent")}</span>
              </h1>
              <p className="lead">{t("hero.lead")}</p>
              <DownloadButton release={release} />
            </div>
            <AppWindow />
          </div>
        </section>

        <section id="watch" className="section section--tight">
          <div className="container">
            <video
              className="promo"
              src={`${import.meta.env.BASE_URL}media/promo.mp4`}
              poster={`${import.meta.env.BASE_URL}media/promo-poster.jpg`}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label={t("video.label")}
            />
          </div>
        </section>

        <section id="screens" className="section section--tinted">
          <div className="container">
            <h2 className="section__title">{t("screens.title")}</h2>
          </div>
          <Gallery />
        </section>

        <section id="features" className="section">
          <div className="container">
            <h2 className="section__title">{t("features.title")}</h2>
            <p className="section__lead">{t("features.lead")}</p>
            <div className="features">
              {features.map((f, i) => (
                <article key={f.title} className="card">
                  <div className="card__icon" aria-hidden="true">
                    {FEATURE_ICONS[i]}
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="install" className="section section--tinted">
          <div className="container">
            <h2 className="section__title">{t("install.title")}</h2>
            <InstallSteps />
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container container--narrow">
            <h2 className="section__title">{t("faq.title")}</h2>
            <div className="faq">
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="download" className="section">
          <div className="container">
            <div className="cta">
              <img
                src={`${import.meta.env.BASE_URL}icon.png`}
                alt=""
                width={88}
                height={88}
              />
              <h2>{t("cta.title")}</h2>
              <p>{t("cta.text")}</p>
              <DownloadButton release={release} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
