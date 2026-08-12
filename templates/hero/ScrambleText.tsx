import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar() { return CHARS[Math.floor(Math.random() * CHARS.length)] }

interface ScrambleTextProps { text: string; isHovered: boolean; className?: string }

export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (intervalRef.current) { window.clearInterval(intervalRef.current); intervalRef.current = null }
    if (!isHovered) { setDisplay(text); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(text); return }
    let frame = 0
    const totalFrames = text.length * 4
    intervalRef.current = window.setInterval(() => {
      const cursor = frame / 4
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ') { out += ' ' }
        else if (i < cursor) { out += ch }
        else { out += randomChar() }
      }
      setDisplay(out)
      frame++
      if (frame >= totalFrames) {
        if (intervalRef.current) window.clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplay(text)
      }
    }, 25)
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current) }
  }, [isHovered, text])

  return <span className={className}>{display}</span>
}
