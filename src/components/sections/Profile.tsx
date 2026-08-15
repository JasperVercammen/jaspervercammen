import { pixelJasper } from '../../data/assets'
import { PROFILE } from '../../data/cv'
import { Section } from '../Section'

export function Profile({ revealed }: { revealed: boolean }) {
  return (
    <Section id="profile" label="Profile" ruled={false} revealed={revealed}>
      <div className="prose">
        <img className="avatar" src={pixelJasper} alt="Pixel-art Jasper holding a laptop" />
        {PROFILE.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
