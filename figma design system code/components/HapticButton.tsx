import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useHapticPress } from '../hooks/useHapticPress'

type ButtonVariant = 'primary' | 'pill' | 'secondary' | 'ghost' | 'disabled'

interface HapticButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'haptic-btn haptic-btn--primary',
  pill:      'haptic-btn haptic-btn--pill',
  secondary: 'haptic-btn haptic-btn--secondary',
  ghost:     'haptic-btn haptic-btn--ghost',
  disabled:  'haptic-btn haptic-btn--disabled',
}

export function HapticButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}: HapticButtonProps) {
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
        className={`${variantStyles[variant]} ${className}`}
      >
        {children}
      </motion.button>

      <style>{`
        .haptic-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-6);
          font-family: var(--font-body);
          font-size: var(--font-size-body);
          font-weight: var(--font-weight-h3);
          letter-spacing: var(--tracking-body);
          border-radius: var(--radius-md);
          border: none;
          cursor: pointer;
          transition: background-color 180ms ease;
          user-select: none;
          -webkit-user-select: none;
        }

        /* Primary */
        .haptic-btn--primary {
          background: var(--color-primary);
          color: var(--color-cream-bright);
          border-radius: var(--radius-md);
        }
        .haptic-btn--primary:hover {
          background: var(--color-primary-hover);
        }

        /* Pill */
        .haptic-btn--pill {
          background: var(--color-primary);
          color: var(--color-cream-bright);
          border-radius: var(--radius-pill);
          padding: var(--space-3) var(--space-8);
        }
        .haptic-btn--pill:hover {
          background: var(--color-primary-hover);
        }

        /* Secondary */
        .haptic-btn--secondary {
          background: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
          border-radius: var(--radius-md);
        }
        .haptic-btn--secondary:hover {
          background: var(--color-primary-subtle);
        }

        /* Ghost */
        .haptic-btn--ghost {
          background: transparent;
          color: var(--color-primary);
          border: none;
          border-radius: var(--radius-md);
        }
        .haptic-btn--ghost:hover {
          background: var(--color-primary-subtle);
        }

        /* Disabled */
        .haptic-btn--disabled {
          background: var(--color-cream-shadow);
          color: var(--color-ink-disabled);
          border-radius: var(--radius-md);
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
