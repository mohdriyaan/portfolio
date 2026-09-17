import type { ReactNode } from 'react'

type ProjectScreenshotProps = {
  src: string
  alt: string
  label: string
  action?: ReactNode
}

export function ProjectScreenshot({ src, alt, label, action }: ProjectScreenshotProps) {
  return (
    <figure className="screenshot-frame">
      <div className="screenshot-toolbar">
        <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
        <span>{label}</span>
        {action ? <div className="screenshot-action">{action}</div> : <span aria-hidden="true" />}
      </div>
      <div className="screenshot-image">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    </figure>
  )
}
