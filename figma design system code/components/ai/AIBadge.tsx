import type { CSSProperties } from 'react'

export type AIBadgeVariant =
  | 'generated'
  | 'suggested'
  | 'powered'
  | 'enhanced'
  | 'draft'
  | 'verified'

interface BadgeConfig {
  label: string
  bg: string
  color: string
  border?: string
}

const VARIANTS: Record<AIBadgeVariant, BadgeConfig> = {
  generated: { label: '✦ AI Generated',  bg: '#7C3AED', color: '#FFFFFF' },
  suggested: { label: '✦ AI Suggested',  bg: '#F5F3FF', color: '#7C3AED', border: '1px solid #7C3AED' },
  powered:   { label: '✦ Powered by AI', bg: '#F0F0FF', color: '#5A5648' },
  enhanced:  { label: '✦ AI Enhanced',   bg: '#0E7490', color: '#FFFFFF' },
  draft:     { label: 'AI Draft',         bg: '#FFFBEB', color: '#D97706' },
  verified:  { label: '✦ Verified',       bg: '#F0FDF4', color: '#16A34A' },
}

interface AIBadgeProps {
  variant?: AIBadgeVariant
  label?: string
  style?: CSSProperties
  className?: string
}

export function AIBadge({ variant = 'generated', label, style, className }: AIBadgeProps) {
  const config = VARIANTS[variant]
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 14px',
        borderRadius: 100,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.01em',
        lineHeight: 1.6,
        backgroundColor: config.bg,
        color: config.color,
        border: config.border,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {label ?? config.label}
    </span>
  )
}
