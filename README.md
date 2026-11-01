# Shiftify website

Marketing page for Shiftify, the offline timesheet app, with a download
link for the macOS `.dmg`. React + TypeScript + Vite, deployed to GitHub Pages.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## Deploy

Pushing to `main` builds and publishes the site
(`.github/workflows/deploy.yml`). One-time setup on GitHub: Settings → Pages →
Source: **GitHub Actions**.

## Publishing a new .dmg

The Shiftify source repo is private and the `.dmg` (~230 MB) is too big to
commit, so it ships as a **release asset on this repo**:

1. Build it in the app repo: `cd ../shiftify/desktop && npm run dist`.
2. On GitHub: Releases → Draft a new release, tag `v1.0.0` (the app version).
3. Attach `desktop/release/Shiftify-<version>-universal.dmg` **renamed to
   `Shiftify.dmg`**, and publish.

The download button links to `releases/latest/download/Shiftify.dmg`, so it
always serves the newest release without a site change. The version and size
next to it are read from the GitHub API at page load. Owner, repo and asset
name live in `src/config.ts`.
