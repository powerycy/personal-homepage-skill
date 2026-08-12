import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { VIDEOS } from './videos'
import BackgroundMedia from './BackgroundMedia'

const VIDEO_2 = VIDEOS.cinematicText

const TEXT = 'A neural-AI interface built on the architecture of the human nervous system. SynapseX translates synaptic activity into computational intelligence. Every signal becomes measurable, structured, and visible. It continuously reconstructs internal state as a dynamic neural map. Biological noise is filtered into actionable cognitive patterns.'

export default function CinematicText() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 })
  const y = useTransform(smooth, [0, 1], [60, -120])
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const transform = useMotionTemplate`rotateX(24deg) translateY(${y}px) translateZ(15px)`

  return (
    <section id="about" ref={ref} className="relative h-screen h-[100dvh] w-full overflow-hidden" style={{ background: '#000' }}>
      <BackgroundMedia src={VIDEO_2} variant="signal" />
      <div className="absolute top-0 left-0 w-full h-[180px] z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #010103, transparent)' }} />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <motion.p data-edit-id="about-overview" style={{ transform, opacity, transformPerspective: 400 }} className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center max-w-5xl">
          {TEXT}
        </motion.p>
      </div>
    </section>
  )
}
