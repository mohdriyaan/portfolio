import type { Project } from '../../types/project'
import { LinkButton } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ProjectScreenshot } from './ProjectScreenshot'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { CaseStudySection } from './CaseStudySection'

type CaseStudyProps = {
  project: Project
  onBack: () => void
}

export function CaseStudy({ project, onBack }: CaseStudyProps) {
  return (
    <main id="main-content" className="case-page">
      <div className="container">
        <div className="case-back-row">
          <button
            className="back-link"
            type="button"
            onClick={onBack}
          >
            ← Back to selected work
          </button>
        </div>

        <header className="case-header">
          <div className="case-kicker">
            <span>{project.number}</span>
            <span>{project.category}</span>
          </div>

          <h1>{project.name}</h1>

          <p>{project.oneLiner}</p>

          <div className="case-meta">
            <div>
              <span>Scope</span>
              <strong>Full-stack</strong>
            </div>

            <div>
              <span>Focus</span>
              <strong>Product + systems</strong>
            </div>

            <div>
              <span>Links</span>
              <strong>Live + source</strong>
            </div>
          </div>
        </header>

        <ProjectScreenshot
          src={project.screenshot}
          alt={project.screenshotAlt}
          label={`${project.name} · live interface`}
        />

        <div className="case-grid">
          <aside className="case-sidebar">
            <p className="case-sidebar-label">Stack</p>

            <div className="badge-column">
              {project.stack.map((item) => (
                <Badge key={item} muted>
                  {item}
                </Badge>
              ))}
            </div>
          </aside>

          <div className="case-content">
            <CaseStudySection
              number="01"
              title="The problem"
            >
              <p className="case-copy">
                {project.problem}
              </p>
            </CaseStudySection>

            <CaseStudySection
              number="02"
              title="Architecture"
            >
              <ArchitectureDiagram
                steps={project.architecture}
              />
            </CaseStudySection>

            <CaseStudySection
              number="03"
              title="Key decisions"
            >
              <ul className="decision-list">
                {project.decisions.map((decision) => (
                  <li key={decision}>
                    {decision}
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection
              number="04"
              title="What I learned"
            >
              <p className="case-copy">
                {project.learned}
              </p>
            </CaseStudySection>

            <div className="case-actions">
              <LinkButton
                className="case-live-button"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open live project ↗
              </LinkButton>

              <LinkButton
                variant="secondary"
                className="case-repository-button"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                View repository ↗
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}