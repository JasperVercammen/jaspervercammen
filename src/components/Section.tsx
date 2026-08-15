import type { ReactNode } from 'react'
import type { SectionId } from '../data/code'

type Props = {
  id: SectionId
  label?: string
  ruled?: boolean
  revealed: boolean
  children: ReactNode
}

export function Section({ id, label, ruled = true, revealed, children }: Props) {
  return (
    <section className={`section section--${id}`} data-revealed={String(revealed)} inert={!revealed}>
      {label && <h2 className={ruled ? 'label label--rule' : 'label'}>{label}</h2>}
      {children}
    </section>
  )
}
