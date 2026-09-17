import type { ArchitectureStep } from '../../types/project'

type ArchitectureDiagramProps = {
  steps: ArchitectureStep[]
}

export function ArchitectureDiagram({ steps }: ArchitectureDiagramProps) {
  return (
    <div className="architecture-grid">
      {steps.map((step, index) => (
        <div className="architecture-node" key={step.label}>
          <span className="architecture-count">0{index + 1}</span>
          <div>
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
          </div>
          {index < steps.length - 1 ? <span className="architecture-arrow" aria-hidden="true">→</span> : null}
        </div>
      ))}
    </div>
  )
}
