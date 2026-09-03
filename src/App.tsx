import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CaseStudy } from './components/CaseStudy'
import { ConfirmDialog } from './components/ConfirmDialog'
import { ContentPane } from './components/ContentPane'
import { Terminal } from './components/Terminal'
import { TitleBar } from './components/TitleBar'
import { CODE, TYPING_SPEED, revealedCount } from './data/code'
import { PROMPT, runCommand, type CommandContext } from './data/commands'
import type { Project } from './data/projects'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useTheme } from './hooks/useTheme'
import { useTerminal } from './hooks/useTerminal'

type WinMode = 'normal' | 'compactWin'

export function App() {
  const [theme, setTheme] = useTheme()
  const isMobile = useMediaQuery('(max-width: 820px)')
  const [winMode, setWinMode] = useState<WinMode>('normal')
  const [minimized, setMinimized] = useState(false)
  const [closed, setClosed] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(true)
  const [openProject, setOpenProject] = useState<Project | null>(null)

  const [history, setHistory] = useState<string[]>([])
  const startedAt = useRef(Date.now()).current

  const { transcript, introChars, done, progress, skip, typeLine, print, clear } = useTerminal(
    CODE,
    TYPING_SPEED,
  )

  const compactWin = winMode === 'compactWin' && !isMobile
  const compact = isMobile || compactWin

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    typeLine(`theme.set("${next}");`)
  }

  const toggleSize = () => {
    const next: WinMode = winMode === 'compactWin' ? 'normal' : 'compactWin'
    setWinMode(next)
    typeLine(`window.resize("${next === 'compactWin' ? 'mobile' : 'desktop'}");`)
  }

  const showProject = useCallback(
    (project: Project) => {
      setOpenProject(project)
      typeLine(`open(<CaseStudy id="${project.id}" />);`)
    },
    [typeLine],
  )

  const closeProject = useCallback(() => {
    setOpenProject(null)
    typeLine('close();')
  }, [typeLine])

  // commands echo the line the visitor typed, so they skip the animated echo
  const showProjectQuiet = useCallback((project: Project) => setOpenProject(project), [])
  const closeProjectQuiet = useCallback(() => setOpenProject(null), [])

  const context: Omit<CommandContext, 'history'> = useMemo(
    () => ({
      print,
      clear,
      theme,
      setTheme,
      winMode,
      setWinMode,
      showProject: showProjectQuiet,
      closeProject: closeProjectQuiet,
      hasOpenProject: openProject !== null,
      minimize: () => setMinimized(true),
      askClose: () => setConfirmOpen(true),
      openUrl: (url: string) => window.open(url, '_blank', 'noopener,noreferrer'),
      startedAt,
    }),
    [print, clear, theme, setTheme, winMode, showProjectQuiet, closeProjectQuiet, openProject, startedAt],
  )

  const submitCommand = useCallback(
    (input: string) => {
      print(PROMPT + input)
      if (input.trim()) setHistory((entries) => [...entries, input.trim()])
      runCommand(input, { ...context, history })
    },
    [context, history, print],
  )

  useEffect(() => {
    if (!done) return
    typeLine('// this session is live — type help')
  }, [done, typeLine])

  useEffect(() => {
    if (!confirmOpen && !openProject) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (confirmOpen) setConfirmOpen(false)
      else closeProject()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [confirmOpen, openProject, closeProject])

  return (
    <div
      className="desk"
      data-mobile={String(isMobile)}
      data-compact={String(compact)}
      data-win={compactWin ? 'compact' : 'normal'}
      data-sheet={sheetOpen ? 'open' : 'closed'}
    >
      {minimized && (
        <button className="dock-tab" onClick={() => setMinimized(false)}>
          ▁ jasper.tsx — minimized · restore()
        </button>
      )}

      {closed && (
        <div className="closed-note">
          <span>// you closed the portfolio without contacting me.</span>
          <button className="closed-note__restore" onClick={() => setClosed(false)}>
            restore()
          </button>
        </div>
      )}

      {!minimized && !closed && (
        <div className="window">
          {!isMobile && (
            <TitleBar
              compactWin={compactWin}
              onClose={() => setConfirmOpen(true)}
              onMinimize={() => setMinimized(true)}
              onToggleSize={toggleSize}
            />
          )}

          <div className="split">
            <Terminal
              transcript={transcript}
              done={done}
              progress={progress}
              history={history}
              onSkip={skip}
              onCommand={submitCommand}
              themeLabel={theme === 'light' ? 'dark' : 'light'}
              onToggleTheme={toggleTheme}
              onHeaderClick={compact ? () => setSheetOpen((open) => !open) : undefined}
            />

            <div className="content">
              <ContentPane stage={revealedCount(introChars)} onOpenProject={showProject} />
              {openProject && <CaseStudy project={openProject} onClose={closeProject} />}
            </div>
          </div>

          {confirmOpen && (
            <ConfirmDialog
              onStay={() => setConfirmOpen(false)}
              onClose={() => {
                setClosed(true)
                setConfirmOpen(false)
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}
