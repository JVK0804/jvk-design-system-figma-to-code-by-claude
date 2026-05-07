import { ReactNode } from 'react'

type TagSize = 'md' | 'sm'

interface TagV1Props {
  children: ReactNode
  size?: TagSize
  className?: string
}

export function TagV1({ children, size = 'md', className = '' }: TagV1Props) {
  return (
    <>
      <span className={`v1-tag v1-tag--${size} ${className}`}>{children}</span>

      <style>{`
        .v1-tag {
          display: inline-flex;
          align-items: center;
          background: var(--v1-color-primary-subtle);
          border: 1px solid var(--v1-color-primary-border);
          border-radius: var(--v1-radius-sm);
          color: var(--v1-color-primary);
          font-family: var(--v1-font-body);
          font-weight: 500;
          white-space: nowrap;
        }

        .v1-tag--md {
          height: 28px;
          padding: 0 var(--v1-space-3);
          font-size: var(--v1-size-caption);
          letter-spacing: 0em;
        }

        .v1-tag--sm {
          height: 22px;
          padding: 0 10px;
          font-size: var(--v1-size-label);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}
