import { CSSProperties, ReactNode } from 'react'

interface GlassCardV3Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/*
 * v3 GlassCard — Deep Ink dark base (#1C1A14)
 * Dark glass: rgba(28,26,20,0.65) + backdrop blur
 * Specular at 8%→1% (subtle on dark), glint at 6% opacity.
 * No grain overlay — dark surfaces don't need it.
 */
export function GlassCardV3({
  children,
  className = '',
  style,
}: GlassCardV3Props) {
  return (
    <div className={`v3-glass-card ${className}`} style={style}>
      <div className="v3-glass-card__content">{children}</div>

      <style>{`
        .v3-glass-card {
          position: relative;
          background: var(--v3-glass-bg);
          border: var(--v3-border-glass);
          border-radius: var(--v3-radius-lg);
          backdrop-filter: var(--v3-blur-glass);
          -webkit-backdrop-filter: var(--v3-blur-glass);
          overflow: hidden;
        }

        .v3-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--v3-radius-lg);
          background: linear-gradient(
            135deg,
            var(--v3-glass-specular-from),
            var(--v3-glass-specular-to)
          );
          pointer-events: none;
          z-index: 1;
        }

        .v3-glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--v3-glass-glint),
            transparent
          );
          pointer-events: none;
          z-index: 2;
        }

        .v3-glass-card__content {
          position: relative;
          z-index: 20;
        }
      `}</style>
    </div>
  )
}
