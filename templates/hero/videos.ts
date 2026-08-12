/**
 * Original media is bundled with the template so the design works immediately.
 * Replace any value below with another imported local asset or an authorized URL.
 * Keep the original files when users want the reference look.
 */
const ORIGINAL_MEDIA = {
  hero: new URL('./assets/videos/hero.mp4', import.meta.url).href,
  cinematicText: new URL('./assets/videos/cinematic-text.mp4', import.meta.url).href,
  metrics: new URL('./assets/videos/metrics.mp4', import.meta.url).href,
  technology: new URL('./assets/videos/technology.mp4', import.meta.url).href,
  footerVideo: new URL('./assets/videos/footer.mp4', import.meta.url).href,
  footerPortrait: new URL('./assets/images/portrait.jpg', import.meta.url).href,
} as const

export const VIDEOS = {
  hero: ORIGINAL_MEDIA.hero,
  cinematicText: ORIGINAL_MEDIA.cinematicText,
  metrics: ORIGINAL_MEDIA.metrics,
  technology: ORIGINAL_MEDIA.technology,
  footer: ORIGINAL_MEDIA.footerVideo,
} as const

export const IMAGES = {
  footerPortrait: ORIGINAL_MEDIA.footerPortrait,
} as const

export const TEMPLATE_OPTIONS = {
  // The final Trae source used the portrait image. Keep footer.mp4 available
  // as an optional alternate without changing the reference layout by default.
  footerMedia: 'image' as 'video' | 'image',
} as const
