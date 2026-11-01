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

## Releases (published automatically)

The Shiftify source repo is private and the `.dmg` (~230 MB) is too big to
commit, so each version ships as a **release on this repo**, published by the
app repo's release workflow when a version tag is pushed there
(`git tag v1.0.1 && git push origin v1.0.1` in `shiftify`; see its
`desktop/README.md` › Releases). Each release holds:

- `Shiftify.dmg`: what the download button serves;
- `Shiftify-mac.zip` and `latest.json` (signed): what the installed Mac app
  reads to update itself. Don't rename, edit or re-upload them by hand: the
  app rejects anything that doesn't match the signature.

The download button links to `releases/latest/download/Shiftify.dmg`, so it
always serves the newest release without a site change. The version and size
next to it are read from the GitHub API at page load. Owner, repo and asset
name live in `src/config.ts`.
