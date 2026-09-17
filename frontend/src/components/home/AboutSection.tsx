import { useReveal } from '../../hooks/useReveal'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutSection() {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section id="about" className="section-block about-section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="About"
          title="I came to software by learning how systems fail."
          description="That background still shapes how I build: trace the problem, make the boundary explicit, then keep the fix understandable."
          id="about-title"
        />

        <div ref={ref} className={`about-layout reveal ${visible ? 'is-visible' : ''}`}>
          <div className="about-story">
            <p className="about-lead">
              I started in technical support, where solving a problem meant tracing it across networks, systems and users until the real cause showed up.
            </p>
            <p>
              Development gave me a chance to move from restoring broken systems to designing them. Since then I have focused on full-stack applications where authentication, validation, APIs and business rules are treated as first-class engineering work.
            </p>
            <p>
              I am looking for a junior role where I can keep shipping, learn from production systems and contribute to a team that cares about how software is built — not only how it looks.
            </p>
          </div>

          <aside className="timeline" aria-labelledby="about-title">
            <p className="timeline-label">Background</p>
            <div className="timeline-item">
              <span>2026</span>
              <div><strong>IT Support Engineer</strong><small>Enoch Tech and Training · Jan 2026 – Jul 2026</small></div>
            </div>
            <div className="timeline-item">
              <span>2024–25</span>
              <div><strong>Network & Technical Support</strong><small>VXI Global Solutions · Sep 2024 – Aug 2025</small></div>
            </div>
            <div className="timeline-item">
              <span>2019–23</span>
              <div><strong>B.E., Information Technology</strong><small>Osmania University</small></div>
            </div>
          </aside>
        </div>

        <div className="principles-grid">
          <div><span>01</span><strong>Clear boundaries</strong><p>Keep API, data, validation and UI responsibilities distinct.</p></div>
          <div><span>02</span><strong>Useful interfaces</strong><p>Every visual element should help someone understand the product or the system behind it.</p></div>
          <div><span>03</span><strong>Honest engineering</strong><p>Show what is measured, what is inferred and what the application actually does.</p></div>
        </div>
      </div>
    </section>
  )
}
