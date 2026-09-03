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
  data/                the typed code + reveal map, CV copy, project case studies, assets, commands
  hooks/               useTerminal, useTheme, useMediaQuery
  styles.css           design tokens + all component styles
design/                the original HTML design reference and its brief
```

## How the typing drives the page

`src/data/code.ts` holds the source that gets typed and a trigger substring per section. Each
trigger's end offset becomes that section's reveal threshold, so a section fades in exactly when its
`render(...)` call finishes typing. `useTerminal` owns the character index and exposes `typeLine()`
and `print()`, which the interactive bits use to append to the session.

Layout responds to two things: the real viewport (`max-width: 820px` → full-bleed, no window chrome,
editor becomes a bottom sheet) and the green traffic light, which shrinks the window to a 400px phone
preview. Both set data attributes on `.desk`; the CSS custom properties do the rest.

Once the intro finishes the editor turns into a real prompt. `src/data/commands.ts` holds the
registry: each command declares a name, optional aliases and a handler that gets a context of
`print`, `clear` and the app's own state setters, so `open uitpas` opens a case study and
`theme dark` really switches the theme. Commands without a `help` string stay out of `help` and out
of tab completion, which is where the easter eggs live. Input also accepts the JS-flavoured forms
the session types on its own — `open(<CaseStudy id="uitpas" />)`, `theme.set("dark")`,
`window.resize("mobile")`, `close()` — normalised in `normalize()`.

Theme lives in `localStorage` under `jv-theme`.
