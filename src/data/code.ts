export const CODE = `const jasper = {
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

// ✓ compiled — session stays open`

export const TYPING_SPEED = 16
export const APPEND_SPEED = 12

const TRIGGERS = {
  hero: 'render(<Hero {...jasper} />);',
  profile: 'render(<Profile years={12} />);',
  experience: '"Sakti",\n]} />);',
  projects: 'render(<Projects featured={4} />);',
  skills: 'render(<Skills />);',
  education: '"Thomas More" />);',
  facts: 'kids={2} runner />);',
  contact: 'vercammenjasper@gmail.com" />);',
} as const

export type SectionId = keyof typeof TRIGGERS

export const SECTION_ORDER = Object.keys(TRIGGERS) as SectionId[]

export const REVEAL_AT = Object.fromEntries(
  Object.entries(TRIGGERS).map(([id, trigger]) => [id, CODE.indexOf(trigger) + trigger.length]),
) as Record<SectionId, number>

export function revealedCount(typedLength: number) {
  return SECTION_ORDER.filter((id) => typedLength >= REVEAL_AT[id]).length
}
