'use client'

import { motion } from 'framer-motion'

interface TokenUsageBarProps {
  used: number
  max: number
  label?: string
}

function getColor(pct: number): string {
  if (pct >= 0.95) return '#DC2626'
  if (pct >= 0.75) return '#D97706'
  if (pct >= 0.40) return '#0E7490'
  return '#16A34A'
}

function getLevel(pct: number): string {
  if (pct >= 0.95) return 'Near limit'
  if (pct >= 0.75) return 'High usage'
  if (pct >= 0.40) return 'Moderate'
  return 'Low usage'
}

export function TokenUsageBar({ used, max, label = 'Context Window' }: TokenUsageBarProps) {
  const pct = Math.min(used / max, 1)
  const color = getColor(pct)
  const level = getLevel(pct)

  return (
    <div
      className="w-full rounded-xl bg-white p-4"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-semibold" style={{ color }}>
          {level}
        </span>
        <span className="text-xs font-semibold" style={{ color }}>
          {Math.round(pct * 100)}%
        </span>
      </div>

      <p className="text-xs mb-3" style={{ color: 'var(--color-ink-muted)' }}>
        {used.toLocaleString()} / {max.toLocaleString()} {label.toLowerCase()} tokens
      </p>

      <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8E4D9' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}
