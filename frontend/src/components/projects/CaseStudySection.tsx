import type { PropsWithChildren } from 'react'
import { useReveal } from '../../hooks/useReveal'

export function CaseStudySection({ number, title, children }: PropsWithChildren<{ number: string; title: string }>) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section ref={ref} className={`case-section reveal ${visible ? 'is-visible' : ''}`}>
      <div className="case-section-number">{number}</div>
      <div className="case-section-content">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}
