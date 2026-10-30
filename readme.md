# Viktor Nešić — Portfolio

The portfolio at [vprogrammers.me](https://vprogrammers.me): a project slider, a works grid, an About page with CV and contact form, and a case study for every project delivered at Merkle. Built with Nitro (Twig patterns, SCSS, TypeScript) and hosted on Firebase Hosting.

## Usage

Before using, you need [node](https://nodejs.org/) installed. Ensure the correct [node-version](./.node-version).

```
npm ci
npm start
```

## Content

- Home page projects: `src/views/_data/index.json` (`"hero": false` keeps a project out of the slider, `"grid": false` out of the grid).
- About page, CV link and contact form: `src/views/_data/about.json`.
- Case studies: one data file in `src/views/_data/work/<slug>.json` and a view in `src/views/work/<slug>.twig`, served at `/work-<slug>`. Add new pages to `public/sitemap.xml`.
- CV: edit `docs/cv/cv.html`, then run `node docs/cv/render.cjs`.

## Tests

```
PORT=8091 npx playwright test --config=tests/playwright/playwright.config.ts tests/playwright/e2e --project=chromium
npx stylelint "src/**/*.scss" && npx eslint src && npm run lint:html
```

## Deploy

The site is exported as static files to `export/` and served by Firebase Hosting (`firebase.json`: clean URLs, the 404 page, cache headers).

One-time setup:

```
npx firebase-tools login
npx firebase-tools use --add   # choose the Firebase project for vprogrammers.me
```

Then every release:

```
npm run deploy
```

Connect the domain `vprogrammers.me` under Hosting → Custom domain in the Firebase console.

## Nitro

For information on how to use Nitro, please refer to [nitro.md](./project/docs/nitro.md).
