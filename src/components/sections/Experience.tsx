import { EXPERIENCE } from '../../data/cv'
import { Section } from '../Section'

export function Experience({ revealed }: { revealed: boolean }) {
  return (
    <Section id="experience" label="Work experience" revealed={revealed}>
      {EXPERIENCE.map((job) => (
        <article key={job.company} className={job.current ? 'job job--current' : 'job'}>
          <div className="job__head">
            <span className="job__company">{job.company}</span>
            <span className="job__role">{job.role}</span>
            <span className="job__dates">{job.dates}</span>
          </div>
          <p className="job__body">{job.body}</p>
          {job.link && (
            <div className="job__links">
              <a className="link" href={job.link.href} target="_blank" rel="noreferrer">
                {job.link.label} ↗
              </a>
            </div>
          )}
        </article>
      ))}
    </Section>
  )
}
