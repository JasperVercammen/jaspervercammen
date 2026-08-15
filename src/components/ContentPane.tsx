import { memo } from 'react'
import type { Project } from '../data/projects'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Profile } from './sections/Profile'
import { Projects } from './sections/Projects'
import { QuickFacts } from './sections/QuickFacts'
import { Skills } from './sections/Skills'

type Props = {
  stage: number
  onOpenProject: (project: Project) => void
}

export const ContentPane = memo(function ContentPane({ stage, onOpenProject }: Props) {
  return (
    <div className="pane">
      <Hero revealed={stage > 0} />
      <Profile revealed={stage > 1} />
      <Experience revealed={stage > 2} />
      <Projects revealed={stage > 3} onOpenProject={onOpenProject} />
      <Skills revealed={stage > 4} />
      <Education revealed={stage > 5} />
      <QuickFacts revealed={stage > 6} />
      <Contact revealed={stage > 7} />
    </div>
  )
})
