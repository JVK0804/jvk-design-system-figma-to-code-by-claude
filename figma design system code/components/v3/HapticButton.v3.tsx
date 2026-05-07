import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useHapticPress } from '../../hooks/useHapticPress'

type ButtonVariant = 'primary' | 'pill' | 'secondary' | 'ghost' | 'disabled'

interface HapticButtonV3Props {
  children: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

/*
 * v3 dark-mode haptic button.
 * Primary: teal phosphor bg (#A5F3FC) + deep ink text — inverted
 * because phosphor is a light colour on a dark canvas.
 */
export function HapticButtonV3({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}: HapticButtonV3Props) {
  const { controls, onPointerDown, onPointerUp, onPointerLeave } = useHapticPress()
  const isDisabled = variant === 'disabled'

  return (
    <>
      <motion.button
        type={type}
        animate={controls}
        onPointerDown={isDisabled ? undefined : onPointerDown}
        onPointerUp={isDisabled ? undefined : onPointerUp}
        onPointerLeave={isDisabled ? undefined : onPointerLeave}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        className={`v3-btn v3-btn--${variant} ${className}`}
      >
        {children}
      </motion.button>

      <style>{`
        .v3-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--v3-space-3) var(--v3-space-6);
          font-family: var(--v3-font-body);
          font-size: var(--v3-size-body);
          font-weight: 500;
          border-radius: var(--v3-radius-md);
          border: none;
          cursor: pointer;
          transition: background-color 180ms ease, opacity 180ms ease;
          user-select: none;
          -webkit-user-select: none;
        }

        /* Phosphor bg + ink text — brightest visible contrast on dark */
        .v3-btn--primary {
          background: var(--v3-color-primary);
          color: var(--v3-color-bg);
        }
        .v3-btn--primary:hover { background: var(--v3-color-primary-dim); }

        .v3-btn--pill {
          background: var(--v3-color-primary);
          color: var(--v3-color-bg);
          border-radius: var(--v3-radius-pill);
          padding: var(--v3-space-3) var(--v3-space-8);
        }
        .v3-btn--pill:hover { background: var(--v3-color-primary-dim); }

        .v3-btn--secondary {
          background: transparent;
          color: var(--v3-color-primary);
          border: 1px solid var(--v3-color-primary-border);
        }
        .v3-btn--secondary:hover { background: var(--v3-color-primary-subtle); }

        .v3-btn--ghost {
          background: transparent;
          color: var(--v3-color-primary);
          border: none;
        }
        .v3-btn--ghost:hover { background: var(--v3-color-primary-subtle); }

        .v3-btn--disabled {
          background: var(--v3-color-surface-raised);
          color: var(--v3-color-text-disabled);
          cursor: not-allowed;
          opacity: 0.6;
        }
      `}</style>
    </>
  )
}
