import { Fragment } from 'react'
import { QUICK_FACTS } from '../../data/cv'
import { Section } from '../Section'

export function QuickFacts({ revealed }: { revealed: boolean }) {
  return (
    <Section id="facts" label="Quick facts" revealed={revealed}>
      <p className="facts">
        {QUICK_FACTS.map((fact, index) => (
          <Fragment key={typeof fact === 'string' ? fact : fact.label}>
            {index > 0 && ' · '}
            {typeof fact === 'string' ? (
              fact
            ) : (
              <a className="facts__link" href={fact.href} target="_blank" rel="noreferrer">
                {fact.label}
              </a>
            )}
          </Fragment>
        ))}
      </p>
    </Section>
  )
}
