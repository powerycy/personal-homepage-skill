import { motion } from 'framer-motion'
import SynapseXLogo from './SynapseXLogo'
import SocialLinks from './SocialLinks'
import { IMAGES, TEMPLATE_OPTIONS, VIDEOS } from './videos'
import { PROFILE } from './content'
import BackgroundMedia from './BackgroundMedia'

const FOOTER_MEDIA = VIDEOS.footer

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full overflow-hidden" style={{ background: '#000' }}>
      <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className="relative w-full md:w-1/2 h-[480px] md:h-auto overflow-hidden flex items-center justify-center" style={{ background: '#000' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,120,160,0.15) 0%, rgba(20,0,40,0.08) 40%, transparent 70%)' }} />
          {TEMPLATE_OPTIONS.footerMedia === 'video' ? (
            <BackgroundMedia src={FOOTER_MEDIA} poster={IMAGES.footerPortrait} variant="signal" fit="contain" />
          ) : (
            <motion.img src={IMAGES.footerPortrait} alt="Portrait of the site owner" initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative z-10 w-full max-w-[840px] h-auto object-contain" style={{ maskImage: 'radial-gradient(ellipse 80% 85% at 50% 45%, black 55%, transparent 90%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 85% at 50% 45%, black 55%, transparent 90%)', filter: 'brightness(0.85) contrast(1.1)' }} />
          )}
        </div>
        <div className="flex flex-col justify-between w-full md:w-1/2 p-10 sm:p-16">
          <div>
            <div className="flex items-center gap-2 mb-8 text-white/70">
              <SynapseXLogo size={18} color="rgba(255,255,255,0.7)" />
              <span data-edit-id="footer-brand" className="text-[15px] font-medium tracking-tight">{PROFILE.brand}</span>
            </div>
            <p data-edit-id="footer-description" className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
              {PROFILE.name} — {PROFILE.role}. {PROFILE.valueProposition}
            </p>
            <div className="mt-8"><SocialLinks /></div>
          </div>
          <div>
            <p data-edit-id="footer-copyright" className="text-white/45 text-[12px] mt-12">&copy; 2026 {PROFILE.name}. Replace with the real copyright notice.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
