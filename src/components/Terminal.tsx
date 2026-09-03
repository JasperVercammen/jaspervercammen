import { useEffect, useRef, useState } from 'react'
import { COMPLETIONS, PROMPT } from '../data/commands'

type Props = {
  transcript: string
  done: boolean
  progress: number
  history: string[]
  onSkip: () => void
  onCommand: (input: string) => void
  themeLabel: string
  onToggleTheme: () => void
  onHeaderClick?: () => void
}

export function Terminal({
  transcript,
  done,
  progress,
  history,
  onSkip,
  onCommand,
  themeLabel,
  onToggleTheme,
  onHeaderClick,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const [recall, setRecall] = useState<number | null>(null)

  useEffect(() => {
    const box = boxRef.current
    if (!box || box.scrollHeight <= box.clientHeight) return
    const nearBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 60
    if (nearBottom) box.scrollTop = box.scrollHeight
  }, [transcript, input, done])

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = input
      setInput('')
      setRecall(null)
      onCommand(value)
      return
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      if (!history.length) return
      const next =
        event.key === 'ArrowUp'
          ? Math.max(0, (recall ?? history.length) - 1)
          : Math.min(history.length, (recall ?? history.length) + 1)
      setRecall(next)
      setInput(history[next] ?? '')
      return
    }
    if (event.key === 'Tab') {
      event.preventDefault()
      const word = input.trim().toLowerCase()
      if (!word) return
      const matches = COMPLETIONS.filter((name) => name.startsWith(word))
      if (matches.length === 1) setInput(`${matches[0]} `)
      else if (matches.length > 1) onCommand(`echo ${matches.join('  ')}`)
      return
    }
    if (event.key === 'l' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      onCommand('clear')
    }
  }

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

      <div
        className="code-box"
        ref={boxRef}
        onClick={() => (done ? inputRef.current?.focus() : onSkip())}
        title={done ? 'Click to type' : 'Click to fast-forward'}
      >
        <pre className="code">
          {transcript}
          {done ? (
            <>
              {transcript ? '\n' : ''}
              <span className="prompt">{PROMPT}</span>
              {input}
              <span className={focused ? 'cursor' : 'cursor cursor--idle'} />
            </>
          ) : (
            <span className="cursor" />
          )}
        </pre>
        {done && (
          <input
            ref={inputRef}
            className="code-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Terminal input — type help for commands"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  )
}
