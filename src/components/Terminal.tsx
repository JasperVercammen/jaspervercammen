import { useEffect, useRef } from 'react'

type Props = {
  typed: string
  done: boolean
  progress: number
  onSkip: () => void
  themeLabel: string
  onToggleTheme: () => void
  onHeaderClick?: () => void
}

export function Terminal({ typed, done, progress, onSkip, themeLabel, onToggleTheme, onHeaderClick }: Props) {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = boxRef.current
    if (!box || box.scrollHeight <= box.clientHeight) return
    const nearBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 60
    if (nearBottom) box.scrollTop = box.scrollHeight
  }, [typed])

  return (
    <div className="terminal">
      <div className="terminal__header" onClick={onHeaderClick}>
        <span className="terminal__title">jasper.tsx — live session</span>
        <button
          className="theme-toggle"
          onClick={(e) => {
            e.stopPropagation()
            onToggleTheme()
          }}
        >
          {themeLabel}
        </button>
      </div>

      <div className="progress">
        <div className="progress__bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="code-box" ref={boxRef} onClick={onSkip} title={done ? undefined : 'Click to fast-forward'}>
        <pre className="code">
          {typed}
          <span className="cursor" />
        </pre>
      </div>
    </div>
  )
}
