'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AIResponseCardProps {
  model?: string
  content: string
  streaming?: boolean
  onCopy?: () => void
  onHelpful?: () => void
  onNotHelpful?: () => void
  onRegenerate?: () => void
}

export function AIResponseCard({
  model = 'Claude Sonnet 4.6',
  content,
  streaming = false,
  onCopy,
  onHelpful,
  onNotHelpful,
  onRegenerate,
}: AIResponseCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
    onCopy?.()
  }

  return (
    <div
      className="w-full rounded-2xl bg-white overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full text-white text-xs font-semibold flex-shrink-0"
          style={{ backgroundColor: 'var(--color-ai-purple, #7C3AED)' }}
        >
          AI
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--color-ink-muted)' }}>
          {model}
          {streaming && (
            <span className="ml-2 opacity-60">• streaming</span>
          )}
        </span>
      </div>

      <div style={{ height: 1, backgroundColor: 'rgba(28,26,20,0.06)', margin: '0 24px' }} />

      {/* Body */}
      <div className="px-6 py-5 text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
        {content}
        {streaming && (
          <motion.span
            className="inline-block ml-1 w-0.5 h-4 align-middle"
            style={{ backgroundColor: 'var(--color-ai-purple, #7C3AED)' }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </div>

      {/* Action bar */}
      <AnimatePresence>
        {!streaming && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-3"
            style={{ backgroundColor: '#F0EDE8' }}
          >
            <ActionBtn onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy'}
            </ActionBtn>
            <ActionBtn onClick={onHelpful}>↑ Helpful</ActionBtn>
            <ActionBtn onClick={onNotHelpful}>↓ Not helpful</ActionBtn>

            <div className="ml-auto">
              <motion.button
                onClick={onRegenerate}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                style={{ backgroundColor: 'var(--color-ai-purple, #7C3AED)' }}
              >
                ↻ Retry
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ActionBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="px-3 py-1.5 rounded-lg bg-white text-xs font-medium"
      style={{
        color: 'var(--color-ink-muted)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {children}
    </motion.button>
  )
}
