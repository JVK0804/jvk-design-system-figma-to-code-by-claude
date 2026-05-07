import { CSSProperties, ReactNode } from 'react'
import { GrainOverlay } from '../GrainOverlay'

interface GlassCardV1Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  withGrain?: boolean
}

/*
 * v1 GlassCard — Heritage Cream base (#E8E4D9)
 * Warmer, more saturated cream vs v2's cream-bright.
 * Same 5-layer composition, tighter specular at 32%→6%.
 */
export function GlassCardV1({
  children,
  className = '',
  style,
  withGrain = false,
}: GlassCardV1Props) {
  return (
    <div className={`v1-glass-card ${className}`} style={style}>
      {withGrain && <GrainOverlay />}
      <div className="v1-glass-card__content">{children}</div>

      <style>{`
        .v1-glass-card {
          position: relative;
          background: var(--v1-glass-bg);
          border: var(--v1-border-glass);
          border-radius: var(--v1-radius-lg);
          backdrop-filter: var(--v1-blur-glass);
          -webkit-backdrop-filter: var(--v1-blur-glass);
          overflow: hidden;
        }

        .v1-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--v1-radius-lg);
          background: linear-gradient(
            135deg,
            var(--v1-glass-specular-from),
            var(--v1-glass-specular-to)
          );
          pointer-events: none;
          z-index: 1;
        }

        .v1-glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--v1-glass-glint),
            transparent
          );
          pointer-events: none;
          z-index: 2;
        }

        .v1-glass-card__content {
          position: relative;
          z-index: 20;
        }
      `}</style>
    </div>
  )
}
