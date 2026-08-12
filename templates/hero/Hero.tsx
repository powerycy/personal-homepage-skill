import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScrambleIn from './ScrambleIn'
import BackgroundMedia from './BackgroundMedia'
import { VIDEOS } from './videos'
import { PROFILE } from './content'

const HERO_VIDEO = VIDEOS.hero

function useMouseScrub(videoRef: React.RefObject<HTMLVideoElement>) {
  const reduceMotion = useReducedMotion()
  const lastXRef = useRef<number | null>(null)
  const targetRef = useRef(0)
  const seekingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion || window.matchMedia('(pointer: coarse)').matches) return

    const doSeek = () => {
      if (seekingRef.current || !video) return
      const t = targetRef.current
      if (Math.abs(video.currentTime - t) < 0.001) return
      seekingRef.current = true
      try { video.currentTime = t } catch { seekingRef.current = false }
    }

    const onSeeked = () => {
      seekingRef.current = false
      if (Math.abs(video.currentTime - targetRef.current) > 0.001) doSeek()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (lastXRef.current === null) { lastXRef.current = e.clientX; return }
      const dx = e.clientX - lastXRef.current
      lastXRef.current = e.clientX
      if (!video.duration || !isFinite(video.duration)) return
      const scale = video.duration / window.innerWidth
      targetRef.current = Math.max(0, Math.min(video.duration, targetRef.current + dx * 0.8 * scale))
      doSeek()
    }

    const onLoadedMetadata = () => {
      targetRef.current = 0
      try { video.currentTime = 0 } catch { /* noop */ }
    }

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [videoRef, reduceMotion])
}

interface HeroProps { entranceComplete: boolean }

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useMouseScrub(videoRef)

  return (
    <section id="top" className="relative h-screen h-[100dvh] w-full overflow-hidden" style={{ background: '#000' }}>
      <BackgroundMedia src={HERO_VIDEO} variant="neural" scrubbed videoRef={videoRef} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.08) 52%, rgba(0,0,0,0.12) 100%), linear-gradient(to top, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.12) 58%, rgba(0,0,0,0.3) 100%), radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: 'cover, cover, 24px 24px' }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ transform: 'translateY(50px)' }}>
        <span style={{ fontFamily: '"Avenir Next Condensed", Impact, sans-serif', fontSize: 'clamp(120px, 30vw, 521px)', letterSpacing: '-4px', textTransform: 'uppercase', lineHeight: 1, opacity: 0.1, background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
          TRANSCENDENCE
        </span>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: entranceComplete ? 1 : 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="relative z-10 flex flex-col h-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="flex-1" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p data-edit-id="hero-identity" className="text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-white/70">{PROFILE.name} · {PROFILE.role}</p>
            <h1 className="text-white font-normal leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>
            <motion.p data-edit-id="hero-value-proposition" initial={{ y: 25, opacity: 0 }} animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }} className="max-w-sm text-[13px] sm:text-[15px] text-white/80 leading-relaxed">
              {PROFILE.valueProposition}
            </motion.p>
            <motion.div initial={{ y: 18, opacity: 0 }} animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="flex flex-wrap gap-3 pointer-events-auto">
              <a href="#technology" className="rounded-full bg-white px-5 py-3 text-[12px] font-bold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore the system</a>
              <a href="#about" className="rounded-full border border-white/20 px-5 py-3 text-[12px] text-white transition-colors hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Meet the builder</a>
            </motion.div>
          </div>
          <h1 className="text-white font-normal leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  )
}
