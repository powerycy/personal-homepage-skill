import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar() { return CHARS[Math.floor(Math.random() * CHARS.length)] }

interface ScrambleInProps { text: string; delay: number; triggered: boolean }

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState('')
  const cursorRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!triggered) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }
    timeoutRef.current = window.setTimeout(() => {
      cursorRef.current = 0
      intervalRef.current = window.setInterval(() => {
        const cursor = cursorRef.current
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          if (ch === ' ') { out += ' ' }
          else if (i < cursor) { out += ch }
          else if (i < cursor + 3) { out += randomChar() }
          else { out += '' }
        }
        setDisplay(out)
        cursorRef.current += 0.5
        if (cursorRef.current >= text.length + 3) {
          if (intervalRef.current) window.clearInterval(intervalRef.current)
          intervalRef.current = null
          setDisplay(text)
        }
      }, 25)
    }, delay)
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [triggered, delay, text])

  if (!triggered) return <span dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat(text.length) }} />
  return <span>{display}</span>
}
