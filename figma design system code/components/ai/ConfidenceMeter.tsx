import { motion } from 'framer-motion'

export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'verified'

interface LevelConfig {
  label: string
  desc: string
  pct: number
  color: string
  bg: string
  dots: number
}

const LEVELS: Record<ConfidenceLevel, LevelConfig> = {
  low:      { label: 'Low',      desc: 'Uncertain — review carefully',  pct: 0.25, color: '#DC2626', bg: '#FEF2F2', dots: 1 },
  medium:   { label: 'Medium',   desc: 'Plausible — verify key points', pct: 0.60, color: '#D97706', bg: '#FFFBEB', dots: 2 },
  high:     { label: 'High',     desc: 'Confident — well-supported',    pct: 0.92, color: '#16A34A', bg: '#F0FDF4', dots: 3 },
  verified: { label: 'Verified', desc: 'Grounded in cited sources',     pct: 1.00, color: '#0E7490', bg: '#F5F3FF', dots: 4 },
}

interface ConfidenceMeterProps {
  level: ConfidenceLevel
}

export function ConfidenceMeter({ level }: ConfidenceMeterProps) {
  const cfg = LEVELS[level]

  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: cfg.bg }}
    >
      <p className="text-lg font-semibold mb-1" style={{ color: cfg.color }}>
        {cfg.label}
      </p>
      <p className="text-xs mb-4" style={{ color: 'var(--color-ink-muted)' }}>
        {cfg.desc}
      </p>

      {/* Dot indicators */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: i < cfg.dots ? cfg.color : '#D4CFBF' }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8E4D9' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: cfg.color }}
          initial={{ width: 0 }}
          animate={{ width: `${cfg.pct * 100}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
      <p className="text-right text-xs font-semibold mt-1" style={{ color: cfg.color }}>
        {Math.round(cfg.pct * 100)}%
      </p>
    </div>
  )
}
