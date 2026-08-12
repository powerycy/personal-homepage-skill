import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './Navbar'
import Hero from './Hero'
import CinematicText from './CinematicText'
import Metrics from './Metrics'
import Technology from './Technology'
import Architecture from './Architecture'
import Footer from './Footer'
import InlineEditor from './InlineEditor'

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setEntranceComplete(true), 800)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, touchMultiplier: 1.5 })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let rafId = 0
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ;(window as unknown as { __lenis?: Lenis }).__lenis = undefined
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
    <div style={{ fontFamily: '"SFMono-Regular", "SF Mono", ui-monospace, "PingFang SC", "Microsoft YaHei", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <CinematicText />
      <Metrics />
      <Technology />
      <Architecture />
      <Footer />
      <InlineEditor />
    </div>
    </MotionConfig>
  )
}
