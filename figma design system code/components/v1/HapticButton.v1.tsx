import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useHapticPress } from '../../hooks/useHapticPress'

type ButtonVariant = 'primary' | 'pill' | 'secondary' | 'ghost' | 'disabled'

interface HapticButtonV1Props {
  children: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function HapticButtonV1({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}: HapticButtonV1Props) {
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
        className={`v1-btn v1-btn--${variant} ${className}`}
      >
        {children}
      </motion.button>

      <style>{`
        .v1-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--v1-space-3) var(--v1-space-6);
          font-family: var(--v1-font-body);
          font-size: var(--v1-size-body);
          font-weight: 500;
          border-radius: var(--v1-radius-md);
          border: none;
          cursor: pointer;
          transition: background-color 180ms ease;
          user-select: none;
          -webkit-user-select: none;
        }

        .v1-btn--primary {
          background: var(--v1-color-primary);
          color: var(--v1-color-cream-bright);
        }
        .v1-btn--primary:hover { background: var(--v1-color-primary-hover); }

        .v1-btn--pill {
          background: var(--v1-color-primary);
          color: var(--v1-color-cream-bright);
          border-radius: var(--v1-radius-pill);
          padding: var(--v1-space-3) var(--v1-space-8);
        }
        .v1-btn--pill:hover { background: var(--v1-color-primary-hover); }

        .v1-btn--secondary {
          background: transparent;
          color: var(--v1-color-primary);
          border: 1px solid var(--v1-color-primary);
        }
        .v1-btn--secondary:hover { background: var(--v1-color-primary-subtle); }

        .v1-btn--ghost {
          background: transparent;
          color: var(--v1-color-primary);
          border: none;
        }
        .v1-btn--ghost:hover { background: var(--v1-color-primary-subtle); }

        .v1-btn--disabled {
          background: var(--v1-color-cream-shadow);
          color: var(--v1-color-ink-disabled);
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
