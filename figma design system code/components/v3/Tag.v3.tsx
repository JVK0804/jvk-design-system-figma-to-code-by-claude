import { ReactNode } from 'react'

type TagSize = 'md' | 'sm'

interface TagV3Props {
  children: ReactNode
  size?: TagSize
  className?: string
}

export function TagV3({ children, size = 'md', className = '' }: TagV3Props) {
  return (
    <>
      <span className={`v3-tag v3-tag--${size} ${className}`}>{children}</span>

      <style>{`
        .v3-tag {
          display: inline-flex;
          align-items: center;
          background: var(--v3-color-primary-subtle);
          border: 1px solid var(--v3-color-primary-border);
          border-radius: var(--v3-radius-sm);
          color: var(--v3-color-primary);
          font-family: var(--v3-font-body);
          font-weight: 500;
          white-space: nowrap;
        }

        .v3-tag--md {
          height: 28px;
          padding: 0 var(--v3-space-3);
          font-size: var(--v3-size-caption);
          letter-spacing: 0em;
        }

        .v3-tag--sm {
          height: 22px;
          padding: 0 10px;
          font-size: var(--v3-size-label);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}
