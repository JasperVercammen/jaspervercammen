import { EDUCATION } from '../../data/cv'
import { Section } from '../Section'

export function Education({ revealed }: { revealed: boolean }) {
  return (
    <Section id="education" label="Education" revealed={revealed}>
      <div className="edu-grid">
        {EDUCATION.map((entry) => (
          <div key={entry.degree} className="edu-card">
            <div className="edu-card__degree">{entry.degree}</div>
            <div className="edu-card__school">{entry.school}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
