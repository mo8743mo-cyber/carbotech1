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
