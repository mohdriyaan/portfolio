import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'github-dashboard',
    number: '01',
    name: 'GitHub Dashboard',
    category: 'Developer analytics',
    oneLiner: 'A public-activity dashboard that turns GitHub data into patterns people can actually read.',
    description:
      'Search a public GitHub profile, explore contribution activity and repository statistics, then compare two or three developers side by side without pretending the data says more than it does.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'GitHub REST', 'GitHub GraphQL'],
    liveUrl: 'https://github-dashboard-jp4t.onrender.com',
    repoUrl: 'https://github.com/mohdriyaan/github-dashboard',
    screenshot: '/project-shots/github-dashboard.webp',
    screenshotAlt: 'GitHub Dashboard showing a profile, contribution activity, streak and repository analytics',
    problem:
      'GitHub exposes a lot of raw activity, but the important patterns are scattered across profile, contribution and repository views. The project brings those signals together into one readable surface while keeping interpretations tied to public activity.',
    architecture: [
      { label: 'React client', detail: 'Profile search, analytics views, comparison and shareable output' },
      { label: 'Express API', detail: 'Server layer for GitHub requests and normalized responses' },
      { label: 'GitHub REST + GraphQL', detail: 'Profile/repository data plus contribution-calendar data' },
      { label: 'Shared data layer', detail: 'Contribution and activity modules turn raw responses into reusable signals' },
      { label: 'Snapshot output', detail: 'Analysis can be copied or exported for sharing' },
    ],
    decisions: [
      'Used REST and GraphQL together because the project needs both conventional profile data and contribution-calendar data.',
      'Separated activity interpretation from UI rendering so the same normalized signals can power profile and comparison experiences.',
      'Kept comparison factual: the interface surfaces measurable differences instead of assigning a subjective winner.',
      'Treated responsive data presentation and keyboard-accessible interaction as product requirements, not polish added at the end.',
    ],
    learned:
      'The most useful abstraction ended up being the normalization layer. Once raw API responses were shaped into stable domain data, the UI became simpler and the same signals could support multiple views.',
  },
  {
    slug: 'relocation-budget',
    number: '02',
    name: 'Relocation Budget',
    category: 'Financial planning',
    oneLiner: 'A MERN application for understanding what an international move does to your savings.',
    description:
      'Users can manage savings and relocation expenses, convert amounts across supported currencies, and see remaining budget, recurring spend and financial runway in one place.',
    stack: ['React', 'Vite', 'React Router', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Zod'],
    liveUrl: 'https://relocation-budget.vercel.app/',
    repoUrl: 'https://github.com/mohdriyaan/relocation-budget',
    screenshot: '/project-shots/relocation-budget.webp',
    screenshotAlt: 'Relocation Budget dashboard with budget overview, setup call to action and navigation',
    problem:
      'International relocation mixes one-time costs, recurring costs and different currencies. The project puts those calculations into one authenticated workspace so users can model a move instead of keeping the numbers in disconnected notes and spreadsheets.',
    architecture: [
      { label: 'React client', detail: 'Authenticated dashboard, calculator and expense-management views' },
      { label: 'Express API', detail: 'REST endpoints for authentication, budgets and expenses' },
      { label: 'Validation', detail: 'Zod-based client and server validation with explicit error states' },
      { label: 'MongoDB', detail: 'Users, budgets and expenses persisted through Mongoose models' },
      { label: 'Currency service', detail: 'Exchange rates normalize supported currencies for calculations' },
    ],
    decisions: [
      'Used HTTP-only authentication cookies rather than storing the JWT in browser storage.',
      'Kept authorization and data access user-scoped so a client cannot simply guess another record identifier.',
      'Modeled expense frequency explicitly because one-time and recurring costs affect runway differently.',
      'Validated at both client and server boundaries so invalid financial input is not trusted just because the UI accepted it.',
    ],
    learned:
      'The hard problems were not visual. They were the boundaries around currency conversion, recurring costs, authentication and edge-case calculations. Designing those rules explicitly made the product easier to test and reason about.',
  },
]
