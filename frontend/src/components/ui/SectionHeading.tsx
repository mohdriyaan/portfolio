type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: string
  description?: string
  id?: string
}

export function SectionHeading({ index, eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-index">{index}</div>
      <div className="section-heading-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
    </div>
  )
}
