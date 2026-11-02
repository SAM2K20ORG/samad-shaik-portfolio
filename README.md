# Samad Shaik — Personal Portfolio

A custom dark-editorial portfolio built with React, Vite and plain CSS. It uses the supplied pixel-art avatar and a responsive, single-page layout.

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production-ready static site is generated in `dist/`.

## Current functionality

- Responsive navigation with an accessible mobile toggle and Escape-key dismissal.
- Anchor navigation between all page sections.
- Scroll progress indicator and reveal-on-scroll effects.
- Reduced-motion support and keyboard-visible focus styles.
- External GitHub profile links.
- Responsive project, skills, education/experience and contact sections.
- Page title, description, social preview metadata and custom favicon.

## Before publishing

1. Add Samad's confirmed professional email in `EMAIL` near the top of `src/main.jsx`.
2. Replace the sample project entries with real project details, repository URLs, demos and screenshots. Do not list work as completed until it is complete.
3. Confirm the GitHub profile URL in `GITHUB_URL`.
4. Add LinkedIn and other public profiles only after confirming their exact URLs.
5. If adding a résumé, put the approved PDF in `public/` and add a visible download link.
6. Replace the generic social preview metadata with a dedicated Open Graph image when one is ready.

The avatar is stored at `src/assets/samad-avatar.jpg`. The favicon is `public/favicon.svg`.

## Project structure

```text
samad-shaik-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── samad-avatar.jpg
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```
