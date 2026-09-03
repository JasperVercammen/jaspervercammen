import { useCallback, useEffect, useRef, useState } from 'react'
import { APPEND_SPEED } from '../data/code'

export type Terminal = {
  transcript: string
  introChars: number
  done: boolean
  progress: number
  skip: () => void
  typeLine: (line: string) => void
  print: (text: string) => void
  clear: () => void
}

export function useTerminal(code: string, speed: number): Terminal {
  const [transcript, setTranscript] = useState('')
  const [introChars, setIntroChars] = useState(0)
  const [done, setDone] = useState(false)

  const bufRef = useRef('')
  const doneRef = useRef(false)
  const introRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const appendRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const pendingRef = useRef<{ base: string; line: string } | null>(null)

  const write = useCallback((value: string) => {
    bufRef.current = value
    setTranscript(value)
  }, [])

  const settle = useCallback(() => {
    clearInterval(appendRef.current)
    const pending = pendingRef.current
    if (!pending) return
    pendingRef.current = null
    write(pending.base + pending.line)
  }, [write])

  useEffect(() => {
    let i = 0
    introRef.current = setInterval(() => {
      i += 1
      write(code.slice(0, i))
      setIntroChars(i)
      if (i >= code.length) {
        clearInterval(introRef.current)
        doneRef.current = true
        setDone(true)
      }
    }, speed)
    return () => {
      clearInterval(introRef.current)
      clearInterval(appendRef.current)
    }
  }, [code, speed, write])

  const skip = useCallback(() => {
    if (doneRef.current) return
    clearInterval(introRef.current)
    write(code)
    setIntroChars(code.length)
    doneRef.current = true
    setDone(true)
  }, [code, write])

  const typeLine = useCallback(
    (line: string) => {
      if (!doneRef.current) return
      settle()
      const base = bufRef.current ? `${bufRef.current}\n` : ''
      pendingRef.current = { base, line }
      let j = 0
      appendRef.current = setInterval(() => {
        j += 1
        write(base + line.slice(0, j))
        if (j >= line.length) {
          clearInterval(appendRef.current)
          pendingRef.current = null
        }
      }, APPEND_SPEED)
    },
    [settle, write],
  )

  const print = useCallback(
    (text: string) => {
      settle()
      write(bufRef.current ? `${bufRef.current}\n${text}` : text)
    },
    [settle, write],
  )

  const clear = useCallback(() => {
    clearInterval(appendRef.current)
    pendingRef.current = null
    write('')
  }, [write])

  return {
    transcript,
    introChars,
    done,
    progress: Math.min(100, (introChars / code.length) * 100),
    skip,
    typeLine,
    print,
    clear,
  }
}
