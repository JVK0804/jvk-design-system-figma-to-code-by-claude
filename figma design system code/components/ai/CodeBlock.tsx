'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  code: string
  language?: string
  highlightLines?: number[]
}

export function CodeBlock({ code, language = 'TypeScript', highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const lines = code.split('\n')

  return (
    <div
      className="w-full rounded-xl overflow-hidden font-mono text-sm"
      style={{ backgroundColor: '#0D1117' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: '#161B22' }}
      >
        <span className="text-xs font-medium" style={{ color: '#A5F3FC' }}>
          {language}
        </span>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.96 }}
          className="px-3 py-1 rounded-md text-xs transition-colors"
          style={{
            backgroundColor: '#21262D',
            color: copied ? '#A5F3FC' : '#8B949E',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </motion.button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto py-3">
        {lines.map((line, i) => {
          const lineNum = i + 1
          const isHighlighted = highlightLines.includes(lineNum)
          return (
            <div
              key={i}
              className="flex px-4 leading-relaxed"
              style={{
                backgroundColor: isHighlighted ? 'rgba(124,58,237,0.12)' : undefined,
                minHeight: '1.6rem',
              }}
            >
              <span
                className="select-none w-8 flex-shrink-0 text-right pr-4"
                style={{ color: '#484F58', fontSize: 12 }}
              >
                {lineNum}
              </span>
              <span style={{ color: isHighlighted ? '#A5F3FC' : '#C9D1D9', fontSize: 12, whiteSpace: 'pre' }}>
                {line}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
