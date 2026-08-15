import { useCallback, useEffect, useRef, useState } from 'react'
import { APPEND_SPEED } from '../data/code'

export type Typewriter = {
  typed: string
  done: boolean
  progress: number
  skip: () => void
  typeLine: (line: string) => void
}

export function useTypewriter(code: string, speed: number): Typewriter {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  const typedRef = useRef('')
  const doneRef = useRef(false)
  const runRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const appendRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const write = useCallback((value: string) => {
    typedRef.current = value
    setTyped(value)
  }, [])

  useEffect(() => {
    let i = 0
    runRef.current = setInterval(() => {
      i += 1
      write(code.slice(0, i))
      if (i >= code.length) {
        clearInterval(runRef.current)
        doneRef.current = true
        setDone(true)
      }
    }, speed)
    return () => {
      clearInterval(runRef.current)
      clearInterval(appendRef.current)
    }
  }, [code, speed, write])

  const skip = useCallback(() => {
    if (doneRef.current) return
    clearInterval(runRef.current)
    write(code)
    doneRef.current = true
    setDone(true)
  }, [code, write])

  const typeLine = useCallback(
    (line: string) => {
      if (!doneRef.current) return
      clearInterval(appendRef.current)
      const base = `${typedRef.current}\n`
      let j = 0
      appendRef.current = setInterval(() => {
        j += 1
        write(base + line.slice(0, j))
        if (j >= line.length) clearInterval(appendRef.current)
      }, APPEND_SPEED)
    },
    [write],
  )

  return { typed, done, progress: Math.min(100, (typed.length / code.length) * 100), skip, typeLine }
}
