# Jasper Vercammen — portfolio

A single-page portfolio that "writes itself": a macOS-style window holds a split view where a code
editor types out `jasper.tsx` character by character while the right pane assembles the rendered CV
section by section. The session stays open — opening a case study, toggling the theme or resizing the
window appends new lines to the editor.

Vite + React + TypeScript, no runtime dependencies beyond React.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

| Script              | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Dev server on http://localhost:5173 |
| `npm run build`     | Typecheck + production build        |
| `npm run preview`   | Serve the production build          |
| `npm run typecheck` | Typecheck only                      |

## Structure

```
src/
  App.tsx              window state: theme, size, minimize/close, open case study
  components/          Window chrome, Terminal, ContentPane, CaseStudy, ConfirmDialog
  components/sections/ one component per CV section
  data/                the typed code + reveal map, CV copy, project case studies, assets
  hooks/               useTypewriter, useTheme, useMediaQuery
  styles.css           design tokens + all component styles
design/                the original HTML design reference and its brief
```

## How the typing drives the page

`src/data/code.ts` holds the source that gets typed and a trigger substring per section. Each
trigger's end offset becomes that section's reveal threshold, so a section fades in exactly when its
`render(...)` call finishes typing. `useTypewriter` owns the character index and exposes `typeLine()`,
which the interactive bits use to append to the session.

Layout responds to two things: the real viewport (`max-width: 820px` → full-bleed, no window chrome,
editor becomes a bottom sheet) and the green traffic light, which shrinks the window to a 400px phone
preview. Both set data attributes on `.desk`; the CSS custom properties do the rest.

Theme lives in `localStorage` under `jv-theme`.
