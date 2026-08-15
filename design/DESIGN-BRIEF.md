# Handoff: Jasper Vercammen Portfolio — "the portfolio that writes itself"

## Overview
A single-page developer portfolio for Jasper Vercammen (Senior Frontend Developer, web & mobile, Lier, Belgium). The conceit: the whole site lives inside a macOS-style window containing a split view — a code editor on the left "types" a `jasper.tsx` file character by character, and the right pane is the "rendered output" that assembles section by section as the corresponding code appears. After the initial run the session stays open and later interactions (opening a case study, toggling theme, resizing) append new lines to the terminal.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design as a React codebase** (Vite + React is a good default; no framework lock-in is implied by the prototype). `Jasper Vercammen Portfolio.dc.html` contains the full markup (inside `<x-dc>`) and the full logic (a React-style class named `Component` in the last `<script>`); `index.html` is a self-contained bundled build you can open to see the final behavior. Recreate — don't port the prototype runtime.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and interactions are final. Recreate pixel-perfectly.

## Architecture (suggested React shape)
- `App` — owns global state: `theme` ('light'|'dark', persisted to localStorage key `jv-theme`), `winMode` ('normal'|'compactWin'), `minimized`, `closed`, `confirmOpen`, `openProject` (project object | null), `sheetOpen` (mobile terminal sheet).
- `Window` — the mac-style window chrome (traffic lights + centered address pill).
- `Terminal` — the typing editor pane. Owns typing progress (`charIndex`); exposes `typeLine(line)` to append a line with the same typing animation (12 ms/char). Initial typing speed: 16 ms/char (tweakable). Click anywhere in the code area = fast-forward to end.
- `ContentPane` — scrollable rendered CV; each section has a reveal threshold tied to a position in the typed code (see Reveal map). Reveal animation: opacity 0→1 + translateY(12px)→0, 0.5s ease.
- `CaseStudy` — absolute overlay over ContentPane (riseIn 0.3s ease), scrollable.
- `ConfirmDialog` — modal over the window.
- All colors via CSS custom properties on the root so theme switching is a single swap (see Design Tokens).

## The typed code (verbatim)
```
const jasper = {
  name: "Jasper Vercammen",
  role: "Senior Frontend Developer",
  base: "2500 Lier, Belgium",
  focus: ["web", "mobile"],
};

render(<Hero {...jasper} />);
render(<Profile years={12} />);
render(<Experience at={[
  "Minze Health",
  "icapps",
  "VisionLine",
  "Sakti",
]} />);
render(<Projects featured={4} />);
render(<Skills />);
render(<Education school="Thomas More" />);
render(<QuickFacts kids={2} runner />);
render(<Contact email="vercammenjasper@gmail.com" />);

// ✓ compiled — session stays open
```

## Reveal map (section appears once the typed index passes the END of…)
| Section | Trigger substring |
| --- | --- |
| hero | `render(<Hero {...jasper} />);` |
| profile | `render(<Profile years={12} />);` |
| experience | `"Sakti",\n]} />);` |
| projects | `render(<Projects featured={4} />);` |
| skills | `render(<Skills />);` |
| education | `"Thomas More" />);` |
| facts | `kids={2} runner />);` |
| contact | `vercammenjasper@gmail.com" />);` |

## Screens / Views

### 1. Window + desk
- Desk: full viewport, background `--desk`, 20px padding, window centered, `overflow: hidden`.
- Window: max-width 1600px, fills height, background `--bg`, border 1px `--line`, radius 16px, shadow `0 18px 60px rgba(20,15,10,0.18)`. Width animates 0.4s ease when toggling mobile mode.
- Title bar: 12px 20px padding, bottom border `--line`. Left: three 14px traffic lights (red #ff5f57, yellow #febc2e, green #28c840), 8px gap. Glyph SVGs inside are invisible until the *group* is hovered (opacity 0→1, 0.12s) — macOS behavior. Center: pill `jasper.dev — live preview` (or `— mobile preview`), background `--desk`, border `--line`, radius 999px, 12px font. Right: 72px spacer for symmetry.
- Traffic light actions:
  - Red → confirm dialog: "Are you sure you want to close without contacting me?" Buttons: `no, stay` (filled, `--accent` bg) / `yes, close` (outline #ff5f57) + link "or email me first ↗" (mailto). Yes → empty desk showing `// you closed the portfolio without contacting me.` and a faint `restore()` button.
  - Yellow → minimize: window replaced by a dock-style tab at bottom center: `▁ jasper.tsx — minimized · restore()`; click restores.
  - Green → toggles `winMode`: 'compactWin' shrinks window to 400px wide × min(820px, 100%), centered — phone-sized. Also appends `window.resize("mobile");` / `window.resize("desktop");` to the terminal. Green glyph: normal mode = two large inward-facing filled triangles (shrink), path `M3.8 3.8 L3.8 0.2 L0.2 3.8 Z M4.2 4.2 L4.2 7.8 L7.8 4.2 Z` in an 8×8 viewBox; compact mode = two outward corner triangles (expand), `M1 1 L4.4 1 L1 4.4 Z M7 7 L3.6 7 L7 3.6 Z`. Red glyph: ×-cross stroke path; yellow: minus stroke. Stroke colors: red rgba(77,0,0,.65), yellow rgba(90,60,0,.7), green fill rgba(0,70,10,.7).

### 2. Terminal (left pane, desktop)
- Width 40%, max 520px; background `--code-bg`; right border `--line`.
- Header row: `jasper.tsx — live session` (12.5px `--muted`) + theme toggle button on the right (`dark` / `light` label, 1px `--chipline` border, radius 7px). Toggle appends `theme.set("dark");` to the terminal and persists.
- 3px progress bar under the header: width = typed chars / total, background `--accent`.
- Code area: 24px 28px padding, `pre` 13.5px IBM Plex Mono, line-height 1.75, color `--code-text`, blinking cursor block (8×16px, `--accent`, 1.1s step-end blink). Scrollable (`overflow-y: auto`); auto-follows the bottom while typing but stops following if the user scrolled up >60px from the bottom.
- Footer strip: `click the code to fast-forward ⌁ session stays open` (11.5px `--soft`).

### 3. Content pane (right)
Scrollable; padding 48px 56px (desktop) / 26px 22px 40px (compact). Sections in order, 40px gap; every section after Profile opens with an uppercase 12px letter-spaced label over a 1px top border (28px padding-top).

- **Hero**: name in Instrument Serif 64px (compact: 40px), line-height 1.02, `--ink`; under it `Senior Frontend Developer — web & mobile · Lier, Belgium` 15px `--accent`.
- **Profile**: two paragraphs 14.5px/1.75 `--muted`, max-width 720px. Pixel-art avatar (`pixel-jasper.png`, 150px tall, `image-rendering: pixelated`) floats right with margin 4px 0 16px 20px; text wraps.
  - Paragraph 1: "I have extensive experience in web development, with a focus on JavaScript for over a decade. My background includes several years of PHP development in a startup environment, followed by 8+ years specializing in React and React Native."
  - Paragraph 2: "I'm passionate about frontend development, consistently delivering clean, readable code while managing complex logic. I excel at maintaining a clear overview of large projects, meeting deadlines, and effectively collaborating with product owners and Scrum Masters to drive project success. I'm always eager to learn and embrace new technologies."
- **Work experience**: 4 cards, radius 14px, padding 20px 24px. Current job (Minze Health) highlighted: bg `--accent-soft`, border `--accent-line`; others bg `--card`, border `--line`. Header row: company · location (15px `--ink`), role (12.5px `--accent`), dates right-aligned (12px `--soft`). Body 13.5px/1.7 `--muted`. Minze card includes link "Minze Therapy on Google Play ↗" → https://play.google.com/store/apps/details?id=com.minze.therapy&hl=en
  - Minze Health · Antwerp — Senior frontend developer — 2025 – ongoing: "Appointed to lead the technical overhaul of Minze's React Native apps. Successfully migrated legacy codebases to modern architectures while maintaining a rapid release cycle. Balanced the delivery of new business requirements with essential refactoring to ensure long-term stability and scalability, all within a highly regulated compliance environment."
  - icapps · Antwerp — Senior frontend developer — 2015 – 2024: "At icapps, I transitioned from a junior developer to a frontend specialist, honing my skills in writing clean, efficient code. I contributed my expertise to support the team's direction and consistently provided assistance to colleagues, fostering a collaborative environment."
  - VisionLine · Sint-Katelijne-Waver — Full stack developer — 2013 – 2015: "Worked at VisionLine, a startup in the real estate sector, where I developed and maintained in-house B2B software and various web applications. Primarily responsible for backend development and frontend integration using PHP, JavaScript, and MySQL. Collaborated closely with a small team to deliver efficient, tailored solutions."
  - Sakti · Lier — Owner — Frontend development — 2012 – current: "Founded Sakti as a student to provide professional web development services for small businesses, allowing me to manage client projects and issue invoices. Over the years, I've continued to maintain these websites, using the business as a platform to learn and experiment with new technologies in a professional context."
- **Featured projects**: label "Featured projects — click one to open its case study". 5 cards (radius 14px, padding 18px 22px, bg `--card`): title 15px `--ink` + tagline 12.5px `--muted`, right-aligned role tag 11.5px `--soft`. Hover: border `--accent`, translateX(4px). Cards: Mijn Antwerpen ("The city of Antwerp in every resident's pocket" / React Native · lead), SP Expert Connect ("HR platform — one shared codebase for web + app" / React & RN · lead), Keytrade ("A complete native banking app rebuilt in React Native" / React & RN), Lutastic+ ("Hardware-connected app — BLE, Skia, Expo" / React Native · lead), Adminno4Pro ("Real-estate management, tailored to commercial property" / PHP · lead). Below: "Others: Uitpas, Cashfree, Belgian Economic Mission, Mobility Masters, Essent, Clearfacts, Slim Naar Antwerpen, Sibelga, …" (12.5px `--soft`).
- **Skills**: pill chips (bg `--card`, border `--line`, radius 999px, 12.5px): Javascript / Typescript, React, React Native, HTML / (s)css, Git, Devops, Application Architecture.
- **Education**: two cards side by side (flex, min-width 240px): "Master — Elektronica-ICT" / "Prof. Bachelor — Elektronica-ICT", both "Thomas More · De Nayer Instituut — completed 2013 / 2011".
- **Quick facts**: "Married · Father of 2 · Runner · Sports lover".
- **Contact**: mailto vercammenjasper@gmail.com (underlined), tel +32 497 30 57 98, "2500 Lier, Belgium". Footer line: "Built with React — obviously." (11.5px `--soft`).

### 4. Case study overlay
Opens on project card click; terminal appends `open(<CaseStudy id="…" />);`, close button appends `close();`.
- `← close()` outline button top-left (min-height 44px).
- Title Instrument Serif 46px; role 14px `--accent`.
- "built at" row: 11.5px `--soft` label + company logo rendered via CSS mask (`background: var(--muted); mask: url(logo.svg) no-repeat left center / contain`) so it tints with the theme; heights 22px, widths: icapps 114px, Minze 75px, VisionLine 160px. Years shown after the logo when present (Adminno4Pro: "2013 – 2015").
- Store/link row: underlined links with ↗.
- Sections: What, Tasks & responsibilities, (optional) More — 14px/1.75 `--muted`, max-width 640px, uppercase labels.
- Screenshots: if the project has real screenshots, render them (phone shots 190px wide, desktop shots full-width max 560px, radius 12px, 1px `--line` border). Otherwise 3 drag-and-drop placeholder slots 175×370 (prototype-only affordance; in production just render provided images).
- Stack: chips with `--accent-soft` bg / `--accent-line` border / `--accent` text.

### Project data (verbatim, incl. links)
1. **Mijn Antwerpen** — id `mijn-antwerpen`, role "React Native — Lead frontend developer", built at icapps. What: "With this app residents of Antwerp can make appointments, request documents and send messages to the city, save points and exchange them for benefits, discover interesting activities, consult a map with important locations in the city and receive relevant updates (news, appointments, reminders, …)." Tasks: "Front-end development. Architecture of the application. Designing and setup of the CI/CD. Integration of an authentication system throughout the application and in multiple webviews in the app. Make it secure and robust. WCAG AA implementation." Stack: React, React Native, TypeScript, Webviews, Mapbox, NFC, beacons, Jenkins, Jira. Links: App Store https://apps.apple.com/us/app/mijn-antwerpen/id1642896636 · Google Play https://play.google.com/store/search?q=mijn+antwerpen&c=apps&hl=en. Screenshots: mijn-antwerpen-1..4.webp (phone width).
2. **SP Expert Connect** — id `sp-expert-connect`, role "React & React Native — Lead frontend developer", icapps. What: "SP Expert Connect is an HR application where employees can check their roster, vacation, shift-swaps and company resources. They can request vacation and shift swaps, or chat with each other. We made both an app and a web version of the platform." Tasks: "Front-end development. Architecture of the application, managing the CI/CD. Setup shared layer between web and app. Setup shared component library between different web apps. Wrote a chat functionality via websockets." Stack: React, React Native, TypeScript, Redux, Redux Observable, Websockets, SCSS, Jenkins, Jest, Detox, Cypress. Link: Google Play https://play.google.com/store/apps/details?id=com.sp_expert_connect.app&hl=en
3. **Keytrade** — id `keytrade`, role "React & React Native — Frontend developer", icapps. What: "We replace the complete native banking application of Keytrade. The project included a POC with basic functionalities, redesign from scratch and provided native bridges for Vasco. The app comes with graphs, gestures and performance optimisations all in React Native. It's also tablet ready. The project was rounded in about 1 year." Tasks: "Front-end development. Architecture of the application and data flow/management in the app. Implemented several security functions. Native module bridging." More: "Made the Keyhome platform, the online mortgage tool of Keytrade. Helped on the secure banking environment." Stack: React, React Native, Redux, Jenkins, Javascript, Jest, Enzyme, scss. Links: App Store https://apps.apple.com/be/app/keytrade-bank/id640974593 · Google Play https://play.google.com/store/apps/details?id=be.keytradebank.phone&hl=en · Keyhome https://www.keytradebank.be/node/frontend/en/keyhome/simulation/
4. **Lutastic+** — id `lutastic-plus`, role "React Native — Lead frontend developer", **Minze Health**. What: "A hardware-connected companion app built with Expo, talking to the device over Bluetooth Low Energy, with Skia-driven visuals." Tasks: "Front-end development. Architecture of the application. Designing and setup of the CI/CD. Move from Jenkins to GitHub Actions. Migration from existing redux/sagas to more modern approach. Stabilize bluetooth connection with the hardware side. Make it secure and robust." Stack: React, React Native, Expo, TypeScript, Skia, Redux, BLE, Jenkins, Github. Link: App Store https://apps.apple.com/us/app/lutastic/id6651840803
5. **Adminno4Pro** — id `adminno4pro`, role "PHP — Lead developer, frontend & backend", **VisionLine**, years 2013 – 2015. What: "Adminno4pro is a real-estate management package tailored to commercial property. With the Adminno4pro package you can effortlessly manage your agency's portfolio. Various handy features such as the agenda, task management, prospecting functions and more make it possible to organize your administration effortlessly." Tasks: "Design and development of new features. Maintenance of the existing web app. Responsible for, among other things, implementing a custom agenda and a full-featured todo list. Extending existing features from A to Z (from database to frontend development)." Stack: PHP, MySQL, Illustrator, Javascript, jQuery, Google PHP SDK, Grunt. Screenshots: adminno-portfolio.png, adminno-agenda.png (full-width).

## Interactions & Behavior
- Typing: 16 ms/char; progress bar tracks it; reveals fire per the reveal map; runs ONCE (no loop). Click code = skip to end.
- `typeLine(line)`: appends `\n` + line, typing at 12 ms/char; used by open/close/theme/resize actions.
- Theme: `jv-theme` in localStorage; body + all tokens swap; 0.3s ease background transitions.
- Responsive (real viewport ≤ 820px, or green-button compact mode): window goes full-bleed (no chrome on real mobile), split becomes a column — content on top, terminal becomes a dark bottom sheet (bg #17120d, radius 18px 18px 0 0, height 200px open / 44px collapsed, tap header to toggle, drag handle bar). All tap targets ≥ 44px.
- Case study overlay: riseIn 0.3s (opacity + 14px translateY).

## Design Tokens
Light: bg #faf6ef · desk #eee7d9 · code-bg #f4eee1 · ink #1c1712 · muted #6f6455 · soft #a3937c · line #e7ddcd · card #ffffff · accent oklch(0.55 0.14 18) · accent-soft oklch(0.6 0.14 18 / 0.08) · accent-line oklch(0.6 0.14 18 / 0.3) · code-text #3d3427 · chipline #d8cbb4
Dark: bg #16120e · desk #0c0906 · code-bg #100d09 · ink #f2eade · muted #a99c8c · soft #7d7060 · line #2c2620 · card #1f1a14 · accent oklch(0.75 0.13 18) · accent-soft oklch(0.75 0.13 18 / 0.1) · accent-line oklch(0.75 0.13 18 / 0.35) · code-text #d8cbb4 · chipline #4a4136
Traffic lights: #ff5f57 / #febc2e / #28c840.
Type: Instrument Serif (display/name/titles, italic available) + IBM Plex Mono (everything else) — Google Fonts. Radii: window/case cards 14–16px, buttons 7–8px, chips 999px. Reveal: 0.5s ease; riseIn 0.3s; blink 1.1s step-end.

## Assets (in assets/)
- pixel-jasper.png — pixel-art avatar (float right in Profile)
- icapps-logo.svg, minze-logo.svg, visionline-logo.svg — currentColor/mask-ready company logos
- mijn-antwerpen-1..4.webp — Mijn Antwerpen screenshots
- adminno-portfolio.png, adminno-agenda.png — Adminno4Pro screenshots

## Files
- `Jasper Vercammen Portfolio.dc.html` — the design source (markup + logic class + tokens)
- `index.html` — bundled standalone build (open in a browser to see exact intended behavior)
- `assets/` — all images/logos listed above
