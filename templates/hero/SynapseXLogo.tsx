interface SynapseXLogoProps { size?: number; className?: string; color?: string }

const QUADRANT_PATH = 'M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z'

export default function SynapseXLogo({ size = 18, className = '', color = 'currentColor' }: SynapseXLogoProps) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <g fill={color}>
        <path d={QUADRANT_PATH} />
        <path d={QUADRANT_PATH} transform="rotate(90)" />
        <path d={QUADRANT_PATH} transform="rotate(180)" />
        <path d={QUADRANT_PATH} transform="rotate(270)" />
      </g>
    </svg>
  )
}
