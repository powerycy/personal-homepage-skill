import { useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type BackdropVariant = 'neural' | 'signal' | 'grid'

interface BackgroundMediaProps {
  src?: string
  variant?: BackdropVariant
  scrubbed?: boolean
  fit?: 'cover' | 'contain'
  poster?: string
  videoRef?: React.Ref<HTMLVideoElement>
}

export default function BackgroundMedia({ src, variant = 'neural', scrubbed = false, fit = 'cover', poster, videoRef }: BackgroundMediaProps) {
  const reduceMotion = useReducedMotion()
  const internalRef = useRef<HTMLVideoElement | null>(null)

  const assignVideoRef = useCallback((node: HTMLVideoElement | null) => {
    internalRef.current = node
    if (typeof videoRef === 'function') videoRef(node)
    else if (videoRef) (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = node
  }, [videoRef])

  useEffect(() => {
    const video = internalRef.current
    if (!video || !src || scrubbed || reduceMotion) return

    let active = true
    let inView = false
    const attemptPlay = () => {
      if (!active || !inView || document.hidden) return
      video.muted = true
      void video.play().catch(() => {
        // Browser policy may require the first pointer interaction.
      })
    }
    const onVisibilityChange = () => attemptPlay()
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) attemptPlay()
      else video.pause()
    }, { threshold: 0.08 })

    observer.observe(video)
    video.addEventListener('canplay', attemptPlay)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pointerdown', attemptPlay)
    const timer = window.setTimeout(attemptPlay, 50)

    return () => {
      active = false
      observer.disconnect()
      window.clearTimeout(timer)
      video.removeEventListener('canplay', attemptPlay)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pointerdown', attemptPlay)
    }
  }, [reduceMotion, scrubbed, src])

  return (
    <div className={`hero-media hero-media--${variant}`} aria-hidden="true">
      <div className="hero-media__mesh" />
      <div className="hero-media__scan" />
      {src ? (
        <video
          ref={assignVideoRef}
          className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          src={src}
          poster={poster}
          autoPlay={!scrubbed && !reduceMotion}
          muted
          loop={!scrubbed}
          playsInline
          preload={scrubbed ? 'metadata' : 'auto'}
        />
      ) : null}
    </div>
  )
}
