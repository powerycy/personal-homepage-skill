import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrambleText from './ScrambleText'

type IconProps = { className?: string }

function FeishuIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm9.2 3.2l-3.4 4.3a.3.3 0 0 0 .23.5h1.7l-.7 2.8a.3.3 0 0 0 .53.27l3.4-4.3a.3.3 0 0 0-.23-.5h-1.7l.7-2.8a.3.3 0 0 0-.53-.27z" /></svg>
}
function DouyinIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.57 3.12-5.9 3.15-1.63.07-3.25-.43-4.59-1.33-2.06-1.37-3.23-3.85-3.07-6.31.05-1.43.55-2.83 1.39-3.99.91-1.26 2.24-2.2 3.74-2.62.05.81-.04 1.62-.03 2.43-.49.17-.96.43-1.36.78-1.06.9-1.5 2.42-1.06 3.74.39 1.31 1.62 2.31 2.97 2.43 1.28.16 2.6-.6 3.16-1.74.2-.42.31-.88.31-1.35.01-2.92.02-5.83.01-8.75.01-1.43-.02-2.86.02-4.28z" /></svg>
}
function XIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
}
function GithubIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
}
function InstagramIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
}
function YoutubeIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
}

interface SocialLink { name: string; label: string; href: string; Icon: (p: IconProps) => React.ReactElement }

const SOCIALS: SocialLink[] = [
  { name: 'Feishu', label: 'Feishu', href: 'https://www.feishu.cn', Icon: FeishuIcon },
  { name: 'Douyin', label: 'Douyin', href: 'https://www.douyin.com', Icon: DouyinIcon },
  { name: 'X', label: 'X', href: 'https://x.com', Icon: XIcon },
  { name: 'GitHub', label: 'GitHub', href: 'https://github.com', Icon: GithubIcon },
  { name: 'Instagram', label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { name: 'YouTube', label: 'YouTube', href: 'https://youtube.com', Icon: YoutubeIcon },
]

function SocialLinkItem({ name, label, href, Icon }: SocialLink) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" data-edit-id={`social-${name.toLowerCase()}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} className="flex items-center gap-2 h-10 px-3 rounded-full border border-white/10 text-white/60 hover:text-white transition-colors duration-200" title={label}>
      <Icon className="w-[18px] h-[18px]" />
      <span className="text-[12px] tracking-wide"><ScrambleText text={label} isHovered={hovered} /></span>
    </motion.a>
  )
}

export default function SocialLinks() {
  return <div className="flex flex-wrap items-center gap-3">{SOCIALS.map((s) => <SocialLinkItem key={s.name} {...s} />)}</div>
}
