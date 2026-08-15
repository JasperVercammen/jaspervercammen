import { PROFILE } from '../../data/cv'
import { Section } from '../Section'

export function Hero({ revealed }: { revealed: boolean }) {
  return (
    <Section id="hero" revealed={revealed}>
      <h1 className="hero__name">{PROFILE.name}</h1>
      <div className="hero__headline">{PROFILE.headline}</div>
    </Section>
  )
}
