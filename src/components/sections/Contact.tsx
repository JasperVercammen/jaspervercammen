import { PROFILE } from '../../data/cv'
import { Section } from '../Section'

export function Contact({ revealed }: { revealed: boolean }) {
  return (
    <Section id="contact" label="Contact" revealed={revealed}>
      <div className="contact-row">
        <a className="link" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
        <span className="contact-row__place">{PROFILE.location}</span>
      </div>
      <p className="footer-note">Built with React — obviously.</p>
    </Section>
  )
}
