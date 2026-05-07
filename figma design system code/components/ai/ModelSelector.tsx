'use client'

import { motion } from 'framer-motion'

export type ModelId = 'haiku-4-5' | 'sonnet-4-6' | 'opus-4-7'

interface Model {
  id: ModelId
  label: string
  context: string
}

const MODELS: Model[] = [
  { id: 'haiku-4-5',  label: 'Haiku 4.5',  context: '48K context  •  Fast' },
  { id: 'sonnet-4-6', label: 'Sonnet 4.6', context: '128K context  •  Vision  •  Tool use  •  Extended thinking' },
  { id: 'opus-4-7',   label: 'Opus 4.7',   context: '200K context  •  Vision  •  Max intelligence' },
]

interface ModelSelectorProps {
  value: ModelId
  onChange: (id: ModelId) => void
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const active = MODELS.find(m => m.id === value)!

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex gap-1 p-2 rounded-2xl"
        style={{ backgroundColor: '#ECEAE5' }}
      >
        {MODELS.map(m => {
          const isActive = m.id === value
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className="relative flex-1 py-2.5 rounded-xl text-xs font-medium transition-colors"
              style={{
                color: isActive ? '#FFFFFF' : 'var(--color-ink-muted)',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="model-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundColor: 'var(--color-ai-purple, #7C3AED)',
                    boxShadow: '0 2px 8px rgba(124,58,237,0.25)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{m.label}</span>
            </button>
          )
        })}
      </div>
      <p className="text-xs pl-1" style={{ color: 'var(--color-ink-muted)' }}>
        {active.context}
      </p>
    </div>
  )
}
