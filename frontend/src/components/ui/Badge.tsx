type BadgeProps = {
  children: string
  muted?: boolean
}

export function Badge({ children, muted = false }: BadgeProps) {
  return <span className={`badge ${muted ? 'badge-muted' : ''}`}>{children}</span>
}
