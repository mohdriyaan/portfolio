import { LinkButton } from '../ui/Button'

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-main">
          <p className="eyebrow">Available for junior full-stack & backend roles</p>
          <h1 id="hero-title">I turn messy requirements into software you can reason about.</h1>
          <p className="hero-lede">
            React and Node.js applications with real authentication, explicit business logic, tested boundaries and interfaces that make the underlying system easier to understand.
          </p>
          <div className="hero-actions">
            <LinkButton href="#work">View selected work</LinkButton>
            <LinkButton variant="ghost" href="#contact">Start a conversation ↗</LinkButton>
          </div>
        </div>

        <aside className="hero-note" aria-label="Engineering focus">
          <div className="hero-note-top">
            <span>01 / 03</span>
            <span>Focus</span>
          </div>
          <p className="hero-note-title">Systems over surfaces.</p>
          <div className="focus-list">
            <div><span>Frontend</span><strong>React · Vite</strong></div>
            <div><span>Backend</span><strong>Node · Express</strong></div>
            <div><span>Data</span><strong>MongoDB · APIs</strong></div>
            <div><span>Thinking</span><strong>Auth · validation · tests</strong></div>
          </div>
        </aside>
      </div>
      <div className="hero-rule" aria-hidden="true" />
      <div className="container hero-footnote">
        <span>Independent build</span>
        <span>Building for the web</span>
        <span>2026 / portfolio</span>
      </div>
    </section>
  )
}
