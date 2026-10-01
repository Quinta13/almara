# ALMARA — Luxury Experience

Premium multilingual Vite website for ALMARA's Venetian gondola experience.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

The production build is written to `dist/`.

## Content and assets

- Edit all interface translations in `src/i18n/translations.js`.
- Update contact URLs in `src/main.js` (search for `XXXXXXXXXXX`, `USERNAME`, and `EMAIL@example.com`).
- Replace artwork in `public/assets/`: `logo/logo-almara.png`, `decorations/decoration-left.png`, `decorations/decoration-right.png`, `images/gondola.png`, `icons/`, and `flags/`.
- Italian and English flag assets are included. Add `fr.png`, `de.png`, `es.png`, and `pt.png` under `public/assets/flags/` when available; the site gracefully displays language-code marks meanwhile.

## GitHub Pages

Pushing to `main` runs `.github/workflows/deploy.yml`. Enable **GitHub Pages → Source: GitHub Actions** in the repository settings. Vite automatically derives the base path from `GITHUB_REPOSITORY` in CI, including after a repository rename. For a custom domain, set `VITE_BASE_PATH=/` in the build environment.
