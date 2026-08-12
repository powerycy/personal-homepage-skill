import { motion } from 'framer-motion'
import { VIDEOS } from './videos'
import BackgroundMedia from './BackgroundMedia'

const VIDEO_3 = VIDEOS.metrics

const METRICS = [
  { value: 'TBD', label: 'Measured Latency' },
  { value: 'TBD', label: 'Verified Accuracy' },
  { value: 'TBD', label: 'Validated Capacity' },
]

export default function Metrics() {
  return (
    <section id="metrics" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: '#000' }}>
      <BackgroundMedia src={VIDEO_3} variant="grid" />
      <div className="absolute inset-0 z-[3] bg-black/25 pointer-events-none" />
      <div className="relative z-10 w-full max-w-6xl pt-32 pb-32 px-6">
        <motion.h3 data-edit-id="metrics-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: 'easeOut' }} className="text-white/50 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center">
          Performance Metrics · Replace with verified data
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {METRICS.map((m, i) => (
            <motion.div key={m.label} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }} className="text-center">
              <div data-edit-id={`metrics-${i + 1}-value`} className="text-white text-[clamp(48px,10vw,96px)] font-normal tracking-[-0.04em] leading-none">{m.value}</div>
              <div data-edit-id={`metrics-${i + 1}-label`} className="text-white/60 text-[13px] sm:text-[15px] mt-4 tracking-wide">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
