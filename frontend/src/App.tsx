import type { FormEvent, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Project = {
  slug: string
  name: string
  oneLiner: string
  timeline: string
  role: string
  stack: string[]
  liveUrl: string
  repoUrl: string
  shot: string
  shotAlt: string
  problem: string
  architecture: { label: string; detail: string }[]
  decisions: string[]
  learned: string
}

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL = 'mohammedrayaan1@gmail.com'

const projects: Project[] = [
  {
    slug: 'github-dashboard',
    name: 'GitHub Dashboard',
    oneLiner: 'Turns raw commit history into a defensible read on how someone actually codes.',
    timeline: '5-day solo build',
    role: 'Full-stack — API integration, data processing, deployment',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'GitHub REST', 'GitHub GraphQL', 'Tailwind'],
    liveUrl: 'https://github-dashboard-jp4t.onrender.com',
    repoUrl: 'https://github.com/mohdriyaan/github-dashboard',
    shot: '/github-dashboard-shot.svg',
    shotAlt: 'GitHub Dashboard interface showing developer activity and contribution analysis',
    problem:
      "GitHub's own profile page shows raw activity but no pattern — no way to tell if someone codes in bursts, mostly on weekends, or on a long steady streak, and no way to put two developers side by side.",
    architecture: [
      { label: 'React UI', detail: 'Vite + Tailwind, comparison view for 2–3 profiles' },
      { label: 'Express API layer', detail: 'Normalizes and proxies requests, keeps tokens server-side' },
      { label: 'GitHub REST + GraphQL', detail: 'REST for profile/repo data, GraphQL for the contribution calendar' },
      { label: 'Classification engine', detail: 'Priority-ordered rules over normalized contribution data' },
      { label: 'TTL cache + rate limiter', detail: 'Per-client limits to protect GitHub API quota' },
    ],
    decisions: [
      'Combined REST and GraphQL rather than REST alone — GraphQL is the only practical way to pull full contribution-calendar data without dozens of round trips.',
      'Built a priority-ordered classifier (Sprint Coder → Weekend Warrior → Steady Committer → Consistent Contributor as fallback) instead of a single blended score, so the label is decisive rather than vague.',
      "Added TTL caching and per-client rate limiting from day one, since GitHub's API quota is strict and a public tool with no protection would burn through it fast.",
      'Capped comparison mode at 2–3 profiles instead of a persistent global leaderboard, to keep scope realistic instead of maintaining a tracked-user database.',
    ],
    learned:
      'Handling two API paradigms in one service forced a proper shared data-normalization layer instead of one-off parsers per endpoint — the kind of decision that only shows up once you’re past the toy-project stage.',
  },
  {
    slug: 'relocation-budget',
    name: 'Relocation Budget',
    oneLiner: 'Answers one question precisely: how long will your savings actually last abroad.',
    timeline: 'Solo build, 168 automated tests',
    role: 'Full-stack — auth, data modeling, financial logic',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Zod'],
    liveUrl: 'https://relocation-budget.vercel.app',
    repoUrl: 'https://github.com/mohdriyaan/relocation-budget',
    shot: '/relocation-budget-shot.svg',
    shotAlt: 'Relocation Budget dashboard welcoming a logged-in user with a budget overview and setup prompt',
    problem:
      "People relocating abroad don't have a simple way to see whether their savings will hold up — across multiple currencies and recurring costs — in one place.",
    architecture: [
      { label: 'React UI', detail: 'React Hook Form + Zod validation, responsive dashboard' },
      { label: 'Express API', detail: 'JWT-protected routes, user-scoped queries at the data layer' },
      { label: 'MongoDB + Mongoose', detail: 'Separate models for one-time vs. recurring expenses' },
      { label: 'Exchange-rate API', detail: 'Live conversion across 7 currencies' },
      { label: 'Runway engine', detail: 'Combines balance, recurring costs and conversion into a runway figure' },
    ],
    decisions: [
      'HTTP-only cookies over localStorage for the JWT, specifically to reduce XSS exposure on a finance-adjacent app.',
      'User-scoped authorization enforced at the query level, not just the route level — one user can never fetch another’s budget data by guessing an ID.',
      'One-time and recurring expenses modeled as distinct schemas rather than one type with a flag, because their runway math diverges enough to warrant it.',
      'Validated on both client (Zod + React Hook Form) and server — client-only validation on a financial tool isn’t real validation.',
    ],
    learned:
      "168 tests in, the hardest bugs weren't in the UI — they were in currency rounding and runway math at the edges (zero income, negative balances). That's where the automated tests actually paid for themselves.",
  },
]

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Navbar({ caseStudy, onHome }: { caseStudy: boolean; onHome: () => void }) {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  const toggleTheme = useCallback(() => setDark((value) => !value), [])

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <button className="brand" onClick={onHome} aria-label="Return to home">RIYAAN<span>.</span></button>
        <div className="nav-actions">
          {caseStudy ? (
            <button className="nav-link" onClick={onHome}>← Back to work</button>
          ) : (
            <nav className="nav desktop-only" aria-label="Primary">
              <a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
            </nav>
          )}
          <a className="resume-link" href="/Mohammed_Riyaan_Resume.pdf" download="Mohammed_Riyaan_Resume.pdf" aria-label="Download résumé">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Résumé
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">{dark ? 'Light' : 'Dark'}</button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return <section className="container hero">
    <p className="eyebrow">Mohammed Riyaan — Full-Stack Developer</p>
    <h1>I build systems,<br />not just interfaces.</h1>
    <p className="hero-copy">React and Node.js applications with real authentication, tested business logic, and APIs built to hold up under load — not tutorial clones.</p>
    <div className="actions"><a className="button button-dark" href="#work">View Work</a><a className="button button-light" href="#contact">Contact</a></div>
  </section>
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (slug: string) => void }) {
  const { ref, visible } = useReveal()
  const alternate = index % 2 === 1
  return <div ref={ref} className={`project-card reveal ${visible ? 'is-visible' : ''}`}>
    <div className={`project-copy ${alternate ? 'project-copy-last' : ''}`}>
      <span className="project-number">0{index + 1}</span>
      <h3>{project.name}</h3><p>{project.oneLiner}</p>
      <div className="tags">{project.stack.slice(0, 5).map((item) => <span key={item} className="tag">{item}</span>)}</div>
      <button className="text-button" onClick={() => onOpen(project.slug)}>Read the case study →</button>
      <div className="project-links"><a href={project.liveUrl} target="_blank" rel="noopener">Live demo</a><a href={project.repoUrl} target="_blank" rel="noopener">Repository</a></div>
    </div>
    <button className={`project-shot ${alternate ? 'project-shot-first' : ''}`} onClick={() => onOpen(project.slug)} aria-label={`Open ${project.name} case study`}>
      <img src={project.shot} alt={project.shotAlt} loading="lazy" />
      <span className="shot-overlay"><span>Open case study</span><span>→</span></span>
    </button>
  </div>
}

function Work({ onOpen }: { onOpen: (slug: string) => void }) {
  return <section id="work" className="container section work-section">
    <div className="section-heading"><h2>Selected Work</h2><span>02 shipped</span></div>
    {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpen={onOpen} />)}
  </section>
}

function About() {
  const { ref, visible } = useReveal()
  return <section id="about" className="container section bordered-section">
    <h2 className="section-label">About</h2>
    <div ref={ref} className={`about-grid reveal ${visible ? 'is-visible' : ''}`}>
      <div>
        <p className="display-copy">I started in technical support, where solving a problem meant tracing it across networks, systems, and users until the actual cause showed up.</p>
        <p className="body-copy">That's most of what debugging software turns out to be. I moved into development because I'd rather build the systems than restore them — and I've been shipping full-stack applications since: real authentication, tested business logic, APIs that hold up when the data gets messy.</p>
        <p className="body-copy">I'm looking for a junior full-stack or backend role where I can keep building in production.</p>
      </div>
      <div className="background-column"><p className="mini-label">Background</p><dl>
        <div><dt>IT Support Engineer</dt><dd>Enoch Tech and Training · Jan 2026 – Jul 2026</dd></div>
        <div><dt>Network &amp; Technical Support</dt><dd>VXI Global Solutions · Sep 2024 – Aug 2025</dd></div>
        <div><dt>B.E., Information Technology</dt><dd>Osmania University · 2019 – 2023</dd></div>
      </dl></div>
    </div>
  </section>
}

function Contact() {
  const { ref, visible } = useReveal()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FormErrors = {}
    if (!name.trim()) nextErrors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email.'
    if (message.trim().length < 10) nextErrors.message = 'A few more words would help — 10 characters minimum.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setStatus('error'); return }
    setStatus('sending')
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.setTimeout(() => { window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`; setStatus('success') }, 500)
  }

  return <section id="contact" className="container section bordered-section">
    <div ref={ref} className={`contact-grid reveal ${visible ? 'is-visible' : ''}`}>
      <div>
        <h2 className="contact-title">Get in touch</h2>
        <p className="body-copy contact-copy">Open to junior full-stack and backend roles, and to interesting problems in general. The form hands off to email — nothing here silently disappears into a server I don't have.</p>
        <div className="contact-links"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href="https://github.com/mohdriyaan" target="_blank" rel="noopener">github.com/mohdriyaan</a><a href="https://linkedin.com/in/mohammed-riyaan" target="_blank" rel="noopener">linkedin.com/in/mohammed-riyaan</a></div>
      </div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <label htmlFor="name">Name</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} />{errors.name && <p className="form-error">{errors.name}</p>}
        <label htmlFor="email">Email</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} />{errors.email && <p className="form-error">{errors.email}</p>}
        <label htmlFor="message">Message</label><textarea id="message" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={Boolean(errors.message)} />{errors.message && <p className="form-error">{errors.message}</p>}
        <button className="button button-dark submit-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Opening your email app…' : 'Send message'}</button>
        {status === 'success' && <p className="form-status">Your email app should have opened with everything filled in — hit send there to reach me.</p>}
        {status === 'error' && <p className="form-status error-status">A couple of fields need a fix before this can go out.</p>}
      </form>
    </div>
  </section>
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><span>Mohammed Riyaan — Full-Stack Developer</span><div className="footer-links"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a><a href="https://github.com/mohdriyaan" target="_blank" rel="noopener">GitHub</a></div></div></footer>
}

function Architecture({ steps }: { steps: Project['architecture'] }) {
  return <div className="architecture">{steps.map((step, index) => <div className="architecture-step" key={step.label}><div className="architecture-card"><p>{step.label}</p><span>{step.detail}</span></div>{index < steps.length - 1 && <span className="architecture-arrow">→</span>}</div>)}</div>
}

function CaseSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`case-section reveal ${visible ? 'is-visible' : ''}`}><div className="case-section-heading"><span>{number}</span><h2>{title}</h2></div>{children}</div>
}

function CaseStudy({ project }: { project: Project }) {
  return <main>
    <header className="container case-header"><h1>{project.name}</h1><p className="hero-copy">{project.oneLiner}</p><dl className="meta-grid"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Timeline</dt><dd>{project.timeline}</dd></div><div className="meta-stack"><dt>Stack</dt><dd>{project.stack.map((item) => <span key={item} className="tag">{item}</span>)}</dd></div></dl></header>
    <div className="container case-content"><div className="case-hero-shot"><img src={project.shot} alt={project.shotAlt} /></div>
      <CaseSection number="01" title="The Problem"><p className="case-copy">{project.problem}</p></CaseSection>
      <CaseSection number="02" title="Architecture"><Architecture steps={project.architecture} /></CaseSection>
      <CaseSection number="03" title="Key Decisions"><ul className="decision-list">{project.decisions.map((decision) => <li key={decision}><span>•</span>{decision}</li>)}</ul></CaseSection>
      <CaseSection number="04" title="What I Learned"><p className="case-copy">{project.learned}</p></CaseSection>
      <div className="case-actions bottom-actions"><a className="button button-dark" href={project.liveUrl} target="_blank" rel="noopener">Live Demo</a><a className="button button-light" href={project.repoUrl} target="_blank" rel="noopener">Repository</a></div>
    </div>
  </main>
}

function Home({ onOpenProject }: { onOpenProject: (slug: string) => void }) { return <><Hero /><Work onOpen={onOpenProject} /><About /><Contact /></> }
function readPath() { return window.location.hash.replace(/^#\/?/, '') }
function useHashRouter() {
  const [path, setPath] = useState(readPath)
  useEffect(() => { const onHashChange = () => setPath(readPath()); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange) }, [])
  const navigate = useCallback((nextPath: string) => { window.location.hash = nextPath ? `/${nextPath}` : '/'; window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return { path, navigate }
}
function GrainOverlay() { return <div className="grain-overlay" aria-hidden="true" /> }

function App() {
  const { path, navigate } = useHashRouter()
  const match = path.match(/^work\/(.+)$/)
  const project = match ? projects.find((item) => item.slug === match[1]) : undefined
  useEffect(() => { document.title = project ? `${project.name} — Mohammed Riyaan` : 'Mohammed Riyaan — Full-Stack Developer' }, [project])
  return <div className="app-shell"><GrainOverlay /><Navbar caseStudy={Boolean(project)} onHome={() => navigate('')} />{project ? <CaseStudy project={project} /> : <Home onOpenProject={(slug) => navigate(`work/${slug}`)} />}<Footer /></div>
}

export default App
