import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

type Project = {
  slug: string
  name: string
  oneLiner: string
  timeline: string
  role: string
  stack: string[]
  liveUrl: string
  repoUrl: string
  problem: string
  architecture: { label: string; detail: string }[]
  decisions: string[]
  learned: string
}

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
      'Combined REST and GraphQL rather than REST alone — GraphQL is the practical way to pull full contribution-calendar data without dozens of round trips.',
      'Built a priority-ordered classifier (Sprint Coder → Weekend Warrior → Steady Committer → Consistent Contributor as fallback) instead of a single blended score.',
      'Added TTL caching and per-client rate limiting from day one, since GitHub API quota is strict for a public tool.',
      'Capped comparison mode at 2–3 profiles instead of maintaining a tracked-user database, keeping the scope realistic for a solo build.',
    ],
    learned:
      'Handling two API paradigms in one service forced a proper shared data-normalization layer instead of one-off parsers per endpoint — the kind of decision that only shows up once you are past the toy-project stage.',
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
      'User-scoped authorization enforced at the query level, not just the route level — one user can never fetch another budget by guessing an ID.',
      'One-time and recurring expenses modeled as distinct schemas because their runway math diverges enough to warrant it.',
      'Validated on both client (Zod + React Hook Form) and server — client-only validation on a financial tool is not real validation.',
    ],
    learned:
      "168 tests in, the hardest bugs weren't in the UI — they were in currency rounding and runway math at the edges (zero income, negative balances). That's where the automated tests actually paid for themselves.",
  },
]

function useReveal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
        setVisible(true)
      },
      { threshold: 0.15 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return visible
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
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable in private browsing contexts.
    }
  }, [dark])

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <button className="brand" onClick={onHome} aria-label="Return to home">
          RIYAAN<span>.</span>
        </button>

        {caseStudy ? (
          <button className="nav-link desktop-only" onClick={onHome}>
            ← Back to work
          </button>
        ) : (
          <nav className="nav desktop-only" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        )}

        <button
          className="theme-toggle"
          onClick={() => setDark((value) => !value)}
          aria-label="Toggle color theme"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="container hero">
      <p className="eyebrow">Mohammed Riyaan — Full-Stack Developer</p>
      <h1>
        I build systems,
        <br />
        not just interfaces.
      </h1>
      <p className="hero-copy">
        React and Node.js applications with real authentication, tested business logic, and APIs built to
        hold up under load — not tutorial clones.
      </p>
      <div className="actions">
        <a className="button button-dark" href="#work">
          View Work
        </a>
        <a className="button button-light" href="#contact">
          Contact
        </a>
      </div>
    </section>
  )
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="project-preview" aria-hidden="true">
      <div className="preview-grid" />
      <div className="preview-window">
        <div className="preview-topbar">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-content">
          <div className="preview-line wide" />
          <div className="preview-line medium" />
          <div className="preview-panels">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <p className="preview-label">{project.name}</p>
    </div>
  )
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (slug: string) => void }) {
  return (
    <article className="project-card reveal" data-reveal>
      <div className={`project-copy ${index % 2 ? 'project-copy-last' : ''}`}>
        <span className="project-number">0{index + 1}</span>
        <h3>{project.name}</h3>
        <p>{project.oneLiner}</p>
        <div className="tags">
          {project.stack.slice(0, 5).map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
        <button className="text-button" onClick={() => onOpen(project.slug)}>
          Read the case study →
        </button>
        <div className="project-links">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live demo
          </a>
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Repository
          </a>
        </div>
      </div>
      <button className="preview-button" onClick={() => onOpen(project.slug)} aria-label={`Open ${project.name} case study`}>
        <ProjectPreview project={project} />
      </button>
    </article>
  )
}

function Work({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <section id="work" className="container section work-section">
      <div className="section-heading">
        <h2>Selected Work</h2>
        <span>02 shipped</span>
      </div>
      <div>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

function About() {
  useReveal()

  return (
    <section id="about" className="container section bordered-section">
      <h2 className="section-label">About</h2>
      <div className="about-grid reveal" data-reveal>
        <div>
          <p className="display-copy">
            I started in technical support, where solving a problem meant tracing it across networks, systems,
            and users until the actual cause showed up.
          </p>
          <p className="body-copy">
            That's most of what debugging software turns out to be. I moved into development because I'd rather
            build the systems than restore them — and I've been shipping full-stack applications since: real
            authentication, tested business logic, APIs that hold up when the data gets messy.
          </p>
          <p className="body-copy">I'm looking for a junior full-stack or backend role where I can keep building in production.</p>
        </div>
        <div className="background-column">
          <p className="mini-label">Background</p>
          <dl>
            <div>
              <dt>IT Support Engineer</dt>
              <dd>Enoch Tech and Training · Jan 2026 – Jul 2026</dd>
            </div>
            <div>
              <dt>Network &amp; Technical Support</dt>
              <dd>VXI Global Solutions · Sep 2024 – Aug 2025</dd>
            </div>
            <div>
              <dt>B.E., Information Technology</dt>
              <dd>Osmania University · 2019 – 2023</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || !message.trim()) {
      setStatus('error')
      return
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setStatus('success')
  }

  return (
    <section id="contact" className="container section bordered-section">
      <div className="contact-grid">
        <div>
          <h2 className="contact-title">Get in touch</h2>
          <p className="body-copy contact-copy">
            Open to junior full-stack and backend roles, and to interesting problems in general. The form hands
            off to email — nothing here silently disappears into a server I don't have.
          </p>
          <div className="contact-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="https://github.com/mohdriyaan" target="_blank" rel="noreferrer">
              github.com/mohdriyaan
            </a>
            <a href="/Mohammed_Riyaan_Resume.pdf" target="_blank" rel="noreferrer">
              Download resume
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} noValidate>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Message
            <textarea rows={5} value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <button className="button button-dark submit-button" type="submit">
            Send message
          </button>
          {status === 'success' && <p className="form-status">Your email app should have opened with everything filled in.</p>}
          {status === 'error' && <p className="form-error">Please provide a name, valid email address, and message.</p>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>Mohammed Riyaan — Full-Stack Developer</span>
        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/mohdriyaan" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <main>
      <section className="container case-header">
        <span className="project-number">Case study</span>
        <h1>{project.name}</h1>
        <p className="hero-copy">{project.oneLiner}</p>
        <div className="meta-grid">
          <div>
            <span>Timeline</span>
            <strong>{project.timeline}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span>Stack</span>
            <strong>{project.stack.join(' · ')}</strong>
          </div>
        </div>
        <div className="case-actions">
          <a className="button button-dark" href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
          <a className="button button-light" href={project.repoUrl} target="_blank" rel="noreferrer">
            Repository
          </a>
        </div>
      </section>

      <section className="container case-body">
        <article className="case-block">
          <div className="case-index">01</div>
          <div>
            <h2>The Problem</h2>
            <p>{project.problem}</p>
          </div>
        </article>
        <article className="case-block">
          <div className="case-index">02</div>
          <div>
            <h2>Architecture</h2>
            <div className="architecture-grid">
              {project.architecture.map((step) => (
                <div className="architecture-card" key={step.label}>
                  <strong>{step.label}</strong>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
        <article className="case-block">
          <div className="case-index">03</div>
          <div>
            <h2>Key Decisions</h2>
            <ul className="decision-list">
              {project.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </div>
        </article>
        <article className="case-block">
          <div className="case-index">04</div>
          <div>
            <h2>What I Learned</h2>
            <p>{project.learned}</p>
          </div>
        </article>
      </section>
    </main>
  )
}

function getRoute() {
  return window.location.hash.replace(/^#\/?/, '')
}

export default function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute())
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const activeProject = useMemo(() => {
    const match = route.match(/^work\/(.+)$/)
    return match ? projects.find((project) => project.slug === match[1]) : undefined
  }, [route])

  const goHome = () => {
    window.location.hash = '/'
    window.scrollTo(0, 0)
  }

  const openProject = (slug: string) => {
    window.location.hash = `/work/${slug}`
    window.scrollTo(0, 0)
  }

  return (
    <div className="app-shell">
      <Navbar caseStudy={Boolean(activeProject)} onHome={goHome} />
      {activeProject ? (
        <CaseStudy project={activeProject} />
      ) : (
        <>
          <Hero />
          <Work onOpen={openProject} />
          <About />
          <Contact />
        </>
      )}
      <Footer />
    </div>
  )
}
