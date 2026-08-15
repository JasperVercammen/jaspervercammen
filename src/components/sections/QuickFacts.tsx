import { QUICK_FACTS } from '../../data/cv'
import { Section } from '../Section'

export function QuickFacts({ revealed }: { revealed: boolean }) {
  return (
    <Section id="facts" label="Quick facts" revealed={revealed}>
      <p className="facts">{QUICK_FACTS}</p>
    </Section>
  )
}
