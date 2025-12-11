# Migration: Next.js ➜ Vite + React Router + Tailwind

This folder is the migrated Vite app.

## How to run
```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
```

## What changed
- Removed Next.js and SSR. Everything is now CSR via React Router.
- Replaced `next/link` with a shim that maps to `react-router-dom`.
- Replaced `next/image` with a simple `<img>` shim.
- Tailwind wired for `index.html` + `src/**/*`.
- Routes generated from `src/pages/*` files. Special routes mapped:
  - `/` ➜ `Index` if present
  - `/emi` ➜ `emi.tsx`
  - `/eligibility-check` ➜ `EligibilityCheckPage.tsx` (if present)
- All static assets moved to `public/`.