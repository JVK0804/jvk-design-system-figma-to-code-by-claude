import { CSSProperties, ReactNode } from 'react'
import { GrainOverlay } from './GrainOverlay'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /* Expose grain so the parent scene can own it instead if needed */
  withGrain?: boolean
}

/*
 * Five-layer glass card matching the Figma composition:
 *   L1  Scene grain        — owned by parent scene, not this card
 *   L2  Heritage Cream     — scene background, not this card
 *   L3  Glass card         — this component (rgba cream 45% + backdrop-filter blur)
 *   L4  Specular ::before  — gradient white/28% → white/4% at 135°
 *   L5  Glint   ::after    — 1px top-edge line transparent→white/80%→transparent
 *   L6  Content            — children (z-index: 20)
 */
export function GlassCard({
  children,
  className = '',
  style,
  withGrain = false,
}: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`} style={style}>
      {withGrain && <GrainOverlay />}
      <div className="glass-card__content">{children}</div>

      <style>{`
        .glass-card {
          position: relative;
          background: var(--color-glass-bg);
          border: var(--border-glass);
          border-radius: var(--radius-lg);
          backdrop-filter: var(--blur-glass);
          -webkit-backdrop-filter: var(--blur-glass);
          overflow: hidden;
        }

        /* L4 — Specular */
        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          background: linear-gradient(
            135deg,
            var(--color-glass-specular-from),
            var(--color-glass-specular-to)
          );
          pointer-events: none;
          z-index: 1;
        }

        /* L5 — Glint */
        .glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-glass-glint),
            transparent
          );
          pointer-events: none;
          z-index: 2;
        }

        /* L6 — Content */
        .glass-card__content {
          position: relative;
          z-index: 20;
        }
      `}</style>
    </div>
  )
}
