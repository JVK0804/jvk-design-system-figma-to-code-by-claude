import { ReactNode } from 'react'

type TagSize = 'md' | 'sm'

interface TagProps {
  children: ReactNode
  size?: TagSize
  className?: string
}

/*
 * Tag (size md): 28px height, 12px font, 12px horizontal padding
 * Badge (size sm): 22px height, 10px font, 10px horizontal padding, +1.5px tracking
 * Both: teal fill 10%, teal border 28%, radius-sm (4px)
 */
export function Tag({ children, size = 'md', className = '' }: TagProps) {
  return (
    <>
      <span className={`ds-tag ds-tag--${size} ${className}`}>{children}</span>

      <style>{`
        .ds-tag {
          display: inline-flex;
          align-items: center;
          background: var(--color-primary-subtle);
          border: 1px solid var(--color-primary-border);
          border-radius: var(--radius-sm);
          color: var(--color-primary);
          font-family: var(--font-body);
          font-weight: var(--font-weight-h3);
          white-space: nowrap;
        }

        .ds-tag--md {
          height: 28px;
          padding: 0 var(--space-3);
          font-size: var(--font-size-caption);
          letter-spacing: var(--tracking-caption);
        }

        .ds-tag--sm {
          height: 22px;
          padding: 0 10px;
          font-size: var(--font-size-label);
          letter-spacing: var(--tracking-label);
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}
