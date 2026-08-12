import { motion } from 'framer-motion'
import { VIDEOS } from './videos'
import BackgroundMedia from './BackgroundMedia'

const VIDEO_4 = VIDEOS.technology

const FEATURES = [
  { title: 'Cortical Mapping', desc: 'Real-time spatial reconstruction of active neural regions.' },
  { title: 'Signal Isolation', desc: 'Separates cognitive intent from biological noise.' },
  { title: 'State Prediction', desc: 'Anticipates cognitive transitions before they occur.' },
  { title: 'Loop Feedback', desc: 'Closed-loop adjustment based on outcome correlation.' },
]

export default function Technology() {
  return (
    <section id="technology" className="relative min-h-screen w-full overflow-hidden flex flex-col" style={{ background: '#000' }}>
      <BackgroundMedia src={VIDEO_4} variant="neural" />
      <div className="relative z-10 flex flex-col min-h-screen px-8 sm:px-12 md:px-16 pt-28 pb-12 sm:pt-28 sm:pb-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <motion.h2 data-edit-id="technology-heading" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.0, ease: 'easeOut' }} className="text-white font-normal text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]">
            Adaptive<br />Intelligence
          </motion.h2>
          <motion.p data-edit-id="technology-description" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }} className="text-white/60 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2">
            The system learns your neural baseline within 72 hours. From there, every cognitive state is mapped, predicted, and optimized in real time.
          </motion.p>
        </div>
        <div className="flex-1" />
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}>
              <h4 data-edit-id={`technology-feature-${i + 1}-title`} className="text-white text-[14px] sm:text-[16px] font-normal mb-2">{f.title}</h4>
              <p data-edit-id={`technology-feature-${i + 1}-description`} className="text-white/55 text-[12px] sm:text-[14px] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
