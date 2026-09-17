# Mohammed Riyaan — Portfolio

A responsive React + TypeScript portfolio for Mohammed Riyaan.

## Stack

- React
- TypeScript
- Vite
- CSS (no UI framework dependency)

## Structure

```text
frontend/
├── public/
│   ├── project-shots/
│   │   ├── github-dashboard.webp
│   │   └── relocation-budget.webp
│   ├── favicon.svg
│   └── Mohammed_Riyaan_Resume.pdf
├── src/
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── projects/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

## Deployment

The app is a standard Vite SPA. For Vercel, use `frontend` as the project root, `npm run build` as the build command and `dist` as the output directory.
