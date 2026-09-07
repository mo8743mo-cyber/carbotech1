# Carbotech

Carbotech is a standalone Vite/React site. It does not require Base44, a hosted API,
an authentication provider, or an internet connection at runtime.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

Form submissions, catalog edits, uploads, and the demo account are stored in the
browser's `localStorage`. Data is intentionally local to each browser.

For the local admin area, use `admin@carbotech.local` with any non-empty password.

## Language and currency

The site detects the device/browser language at startup. Arabic (`ar-*`) devices
receive Arabic navigation and RTL layout; other devices use English. The
language button in the navigation can switch languages locally without an
external translation service. All catalog and estimator prices are displayed in
Saudi Riyals (SAR).

## Deploy on Render

Create a **Web Service** connected to the GitHub repository and use:

- **Environment:** Node
- **Build command:** `npm install && npm run build`
- **Start command:** `npm start`
- **Branch:** `master`

The `start` script serves the production build on port `10000`. If deploying as
a Render Static Site instead, use `dist` as the publish directory and leave the
start command empty.
