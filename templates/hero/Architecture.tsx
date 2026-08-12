import { motion } from 'framer-motion'

const LAYERS = [
  { index: 1, name: 'Capture' },
  { index: 2, name: 'Process' },
  { index: 3, name: 'Interface' },
]

export default function Architecture() {
  return (
    <section id="architecture" className="relative min-h-screen w-full flex items-center justify-center" style={{ background: '#000' }}>
      <div className="w-full max-w-3xl px-6 py-32">
        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.0, ease: 'easeOut' }} className="flex flex-col items-center text-center">
          <span data-edit-id="architecture-label" className="text-white/50 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">Architecture</span>
          <h2 data-edit-id="architecture-heading" className="text-white font-normal text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">Three layers. Zero friction.</h2>
          <p data-edit-id="architecture-description" className="text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers structured output to any connected system.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }} className="mt-20 flex flex-col items-center gap-4">
          {LAYERS.map((layer) => (
            <div key={layer.index} className="max-w-md w-full h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6">
              <span className="text-white/50 text-[12px] tracking-[0.15em] uppercase">Layer {layer.index}</span>
              <span data-edit-id={`architecture-layer-${layer.index}-name`} className="text-white text-[16px] sm:text-[18px] font-normal">{layer.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
