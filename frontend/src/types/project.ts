export type ArchitectureStep = {
  label: string
  detail: string
}

export type Project = {
  slug: string
  number: string
  name: string
  category: string
  oneLiner: string
  description: string
  stack: string[]
  liveUrl: string
  repoUrl: string
  screenshot: string
  screenshotAlt: string
  problem: string
  architecture: ArchitectureStep[]
  decisions: string[]
  learned: string
}
