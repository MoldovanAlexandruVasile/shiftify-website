import { AppWindow } from "./components/AppWindow";
import { DownloadButton } from "./components/DownloadButton";
import { Gallery } from "./components/Gallery";
import { SiteFooter } from "./components/SiteFooter";
import { useLatestRelease } from "./hooks/useLatestRelease";

const FEATURES = [
  {
    icon: "📅",
    title: "One tap a day",
    text: "Check in from today's card, or open any day to log hours, a half day off, or a whole range of leave. Forgot a few? Fill them all at once.",
  },
  {
    icon: "🏛️",
    title: "Bank holidays, handled",
    text: "Each client gets its country's public holidays applied automatically, so your working days are always right.",
  },
  {
    icon: "📄",
    title: "Timesheets in Excel or PDF",
    text: "Send a clean monthly timesheet to each client. Sent months lock so nothing changes after the fact.",
  },
  {
    icon: "👥",
    title: "Multiple clients",
    text: "Separate hours, work week, leave and pay for every client. Switch between them from the header.",
  },
  {
    icon: "🔔",
    title: "Reminders that matter",
    text: "A notification on working days you haven't logged, and a monthly one to send your timesheet.",
  },
  {
    icon: "🔒",
    title: "Private by design",
    text: "No account, no server, no tracking. Your data stays on your computer, with daily backups you control.",
  },
];

const STEPS = [
  {
    title: "Download",
    text: "Get the installer for your computer: Mac (Apple Silicon or Intel) or Windows.",
  },
  {
    title: "Install",
    text: "Mac: open the .dmg and drag Shiftify into Applications. Windows: run the installer; it opens Shiftify when done.",
  },
  {
    title: "Allow it once",
    text: "Shiftify isn't from an app store, so the first time it asks. Mac: System Settings → Privacy & Security → “Open Anyway”. Windows: on “Windows protected your PC”, click More info → Run anyway.",
  },
];

const FAQ = [
  {
    q: "Where is my data stored?",
    a: "Only on your computer: ~/Library/Application Support/Shiftify on a Mac, %APPDATA%\\Shiftify on Windows. Nothing is sent to a server. Back up and restore from Settings → Data.",
  },
  {
    q: "Is it just for Romania?",
    a: "It was built for PFAs and freelancers in Romania (with CUI lookup and Romanian), but bank holidays work for many countries and it's fully in English too.",
  },
  {
    q: "Why does my computer warn me when I open it?",
    a: "Shiftify isn't notarized by Apple or signed with a Windows code-signing certificate, which cost money for a free project. macOS asks once (Privacy & Security), and Windows SmartScreen warns once (More info → Run anyway); after that it opens normally.",
  },
  {
    q: "Is Shiftify a commercial product?",
    a: "No. It's a personal project, made for fun and shared for free. It isn't sold or meant for commercial use, and support and updates aren't guaranteed. You download and use it at your own risk.",
  },
  {
    q: "Will updating lose my data?",
    a: "No. Install a newer version over the old one and your data stays where it is.",
  },
];

export default function App() {
  const release = useLatestRelease();

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
            <a href="#screens">Screens</a>
            <a href="#features">Features</a>
            <a href="#install">Install</a>
            <a href="#faq">FAQ</a>
            <a className="btn btn--small" href="#download">
              Download
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <span className="pill">Now on macOS and Windows</span>
              <h1>
                Timesheets for freelancers,{" "}
                <span className="grad">without the spreadsheet.</span>
              </h1>
              <p className="lead">
                Log the days you work for each client, take days off, and send a
                monthly timesheet as Excel or PDF. Bank holidays are applied for
                you. Everything stays on your computer.
              </p>
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
              aria-label="Shiftify in 25 seconds"
            />
          </div>
        </section>

        <section id="screens" className="section section--tinted">
          <div className="container">
            <h2 className="section__title">A closer look</h2>
          </div>
          <Gallery />
        </section>

        <section id="features" className="section">
          <div className="container">
            <h2 className="section__title">
              Everything a monthly timesheet needs
            </h2>
            <p className="section__lead">
              Built for PFAs and freelancers who bill by the day.
            </p>
            <div className="features">
              {FEATURES.map((f) => (
                <article key={f.title} className="card">
                  <div className="card__icon" aria-hidden="true">
                    {f.icon}
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
            <h2 className="section__title">Install in a minute</h2>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step__num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container container--narrow">
            <h2 className="section__title">Questions</h2>
            <div className="faq">
              {FAQ.map((item) => (
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
              <h2>Get Shiftify for Mac or Windows</h2>
              <p>Free. Private. Works offline.</p>
              <DownloadButton release={release} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
