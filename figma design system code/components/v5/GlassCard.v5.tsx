import { CSSProperties, ReactNode } from 'react'
import { GrainOverlay } from '../GrainOverlay'

interface GlassCardV5Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  withGrain?: boolean
}

/*
 * v5 adaptive GlassCard — reads from [data-theme] via CSS variables.
 * Light: cream glass (45% rgba, 32% specular)
 * Dark:  ink glass  (65% rgba,  8% specular)
 * No component-level JS needed — pure CSS token switching.
 */
export function GlassCardV5({
  children,
  className = '',
  style,
  withGrain = false,
}: GlassCardV5Props) {
  return (
    <div className={`v5-glass-card ${className}`} style={style}>
      {withGrain && <GrainOverlay />}
      <div className="v5-glass-card__content">{children}</div>

      <style>{`
        .v5-glass-card {
          position: relative;
          background: var(--v5-glass-bg);
          border: var(--v5-border-glass);
          border-radius: var(--v5-radius-lg);
          backdrop-filter: var(--v5-blur-glass);
          -webkit-backdrop-filter: var(--v5-blur-glass);
          overflow: hidden;
          transition: background 300ms ease, border-color 300ms ease;
        }

        .v5-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--v5-radius-lg);
          background: linear-gradient(
            135deg,
            var(--v5-glass-specular-from),
            var(--v5-glass-specular-to)
          );
          pointer-events: none;
          z-index: 1;
          transition: background 300ms ease;
        }

        .v5-glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--v5-glass-glint),
            transparent
          );
          pointer-events: none;
          z-index: 2;
        }

        .v5-glass-card__content {
          position: relative;
          z-index: 20;
        }
      `}</style>
    </div>
  )
}
