import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SynapseXLogo from './SynapseXLogo'
import SquashHamburger from './SquashHamburger'
import ScrambleText from './ScrambleText'
import { PROFILE } from './content'

const menuSpring = { type: 'spring' as const, stiffness: 350, damping: 28 }

function scrollToTarget(target: string) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis
  const element = document.querySelector<HTMLElement>(target)
  if (!element) return
  if (lenis) lenis.scrollTo(element.offsetTop, { duration: 1.2 })
  else element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', target)
}

function NavPillLink({ label, target, onNavigate }: { label: string; target: string; onNavigate: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button type="button" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => { onNavigate(); scrollToTarget(target) }} className="inline-flex min-h-9 items-center px-1 text-[16px] font-normal text-white/85 hover:text-white transition-colors duration-200 cursor-pointer">
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  )
}

function DownloadButton({ small = false }: { small?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a href={PROFILE.contactHref} data-edit-id={small ? 'nav-contact-link-mobile' : 'nav-contact-link'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }} whileTap={{ scale: 0.97 }} style={{ backgroundColor: '#fff', color: '#000' }} className={`flex items-center gap-2 rounded-full font-medium ${small ? 'h-9 px-3.5 text-[13px]' : 'h-12 px-6 text-[15px]'}`}>
      <span aria-hidden="true">↘</span>
      <ScrambleText text="Connect" isHovered={hovered} />
    </motion.a>
  )
}

function LogoPill({ small = false }: { small?: boolean }) {
  return (
    <motion.a href="#top" aria-label={`${PROFILE.brand} home`} whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }} whileTap={{ scale: 0.98 }} style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className={`flex items-center gap-2 backdrop-blur-md text-white ${small ? 'h-9 px-3 rounded-[10px]' : 'h-12 px-5 rounded-[14px]'}`}>
      <SynapseXLogo size={small ? 15 : 18} color="#fff" />
      <span data-edit-id={small ? 'nav-brand-mobile' : 'nav-brand-desktop'} className={small ? 'text-[13px] font-medium tracking-tight' : 'text-[16px] font-medium tracking-tight'}>{PROFILE.brand}</span>
    </motion.a>
  )
}

interface NavbarProps { entranceComplete: boolean }

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: entranceComplete ? 1 : 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-4 sm:px-6" style={{ pointerEvents: entranceComplete ? 'auto' : 'none' }}>
      <div className="hidden md:flex items-center gap-2">
        <LogoPill />
        <motion.div animate={{ width: menuOpen ? 290 : 48 }} transition={menuSpring} style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className="h-12 rounded-[14px] backdrop-blur-md flex items-center overflow-hidden">
          <motion.button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)} animate={{ width: menuOpen ? 36 : 48, height: menuOpen ? 36 : 48, borderRadius: menuOpen ? 11 : 14, backgroundColor: menuOpen ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0)', marginLeft: menuOpen ? 6 : 0 }} transition={menuSpring} whileHover={menuOpen ? { backgroundColor: 'rgba(255,255,255,0.20)' } : {}} className="flex items-center justify-center shrink-0">
            <SquashHamburger open={menuOpen} color="#fff" />
          </motion.button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: 0.25 }} className="flex items-center gap-5 pl-5">
                <NavPillLink label="About" target="#about" onNavigate={() => setMenuOpen(false)} />
                <NavPillLink label="Metrics" target="#metrics" onNavigate={() => setMenuOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="hidden md:block"><DownloadButton /></div>
      <div className="flex md:hidden items-center gap-2 w-full">
        <motion.div animate={{ width: menuOpen ? 0 : 'auto', opacity: menuOpen ? 0 : 1 }} transition={menuSpring} className="overflow-hidden"><LogoPill small /></motion.div>
        <motion.div animate={{ width: menuOpen ? '100%' : 40 }} transition={menuSpring} style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} className="h-9 rounded-[10px] backdrop-blur-md flex items-center overflow-hidden">
          <motion.button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)} animate={{ width: menuOpen ? 32 : 40, height: menuOpen ? 32 : 36, borderRadius: menuOpen ? 8 : 10, backgroundColor: menuOpen ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0)', marginLeft: menuOpen ? 4 : 0 }} transition={menuSpring} whileHover={menuOpen ? { backgroundColor: 'rgba(255,255,255,0.20)' } : {}} className="flex items-center justify-center shrink-0">
            <SquashHamburger open={menuOpen} mobile color="#fff" />
          </motion.button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.25 }} className="flex items-center gap-4 pl-3">
                <NavPillLink label="About" target="#about" onNavigate={() => setMenuOpen(false)} />
                <NavPillLink label="Metrics" target="#metrics" onNavigate={() => setMenuOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <DownloadButton small />
      </div>
    </motion.nav>
  )
}
