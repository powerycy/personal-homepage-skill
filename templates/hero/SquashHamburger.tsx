import { motion } from 'framer-motion'

interface SquashHamburgerProps { open: boolean; mobile?: boolean; color?: string }

const spring = { type: 'spring' as const, stiffness: 300, damping: 20 }

export default function SquashHamburger({ open, mobile = false, color = '#fff' }: SquashHamburgerProps) {
  const w = mobile ? 15 : 18
  const h = mobile ? 10 : 12
  const barH = mobile ? 1.2 : 1.5
  const midTop = (h - barH) / 2
  const botTop = h - barH

  const barBase = { position: 'absolute' as const, left: 0, height: barH, width: w, background: color, borderRadius: barH, transformOrigin: 'center center' as const }

  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <motion.span style={{ ...barBase, top: 0 }} animate={open ? { rotate: 45, y: midTop } : { rotate: 0, y: 0 }} transition={spring} />
      <motion.span style={{ ...barBase, top: midTop }} animate={open ? { opacity: 0, scaleY: 0 } : { opacity: 1, scaleY: 1 }} transition={spring} />
      <motion.span style={{ ...barBase, top: botTop }} animate={open ? { rotate: -45, y: -midTop } : { rotate: 0, y: 0 }} transition={spring} />
    </div>
  )
}
