interface GrainOverlayProps {
  opacity?: number
  className?: string
}

export function GrainOverlay({ opacity = 0.4, className }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage: 'var(--grain-scene)',
        backgroundSize: 'var(--grain-size)',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  )
}
