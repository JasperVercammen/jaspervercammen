import { SKILLS } from '../../data/cv'
import { Section } from '../Section'

export function Skills({ revealed }: { revealed: boolean }) {
  return (
    <Section id="skills" label="Skills" revealed={revealed}>
      <div className="chip-row">
        {SKILLS.map((skill) => (
          <span key={skill} className="chip">
            {skill}
          </span>
        ))}
      </div>
    </Section>
  )
}
