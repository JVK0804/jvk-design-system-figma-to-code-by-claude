'use client'

import { useState, useEffect, useRef } from 'react'

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'comment'
  text: string
}

interface TerminalBlockV3Props {
  lines: TerminalLine[]
  prompt?: string
  typewriter?: boolean
  className?: string
}

/*
 * v3 CRT Terminal Block — Anonymous Pro, phosphor green (#A5F3FC) on ink (#0A0F0C)
 * typewriter: streams lines one character at a time
 * Scanline overlay via CSS repeating-linear-gradient
 */
export function TerminalBlockV3({
  lines,
  prompt = '❯',
  typewriter = false,
  className = '',
}: TerminalBlockV3Props) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>(
    typewriter ? [] : lines
  )
  const [cursorVisible, setCursorVisible] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!typewriter) return
    let lineIdx = 0
    const interval = setInterval(() => {
      if (lineIdx >= lines.length) { clearInterval(interval); return }
      setVisibleLines(prev => [...prev, lines[lineIdx]])
      lineIdx++
    }, 340)
    return () => clearInterval(interval)
  }, [lines, typewriter])

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleLines])

  const lineColor = (type: TerminalLine['type']) => {
    if (type === 'error')   return 'var(--v3-color-crt-error, #FF6B6B)'
    if (type === 'comment') return 'var(--v3-color-crt-dim)'
    if (type === 'command') return 'var(--v3-color-crt-text)'
    return 'rgba(165, 243, 252, 0.75)'
  }

  return (
    <div className={`v3-terminal ${className}`}>
      {/* Scanline overlay */}
      <div className="v3-terminal__scanlines" aria-hidden />

      <div className="v3-terminal__body">
        {visibleLines.map((line, i) => (
          <div key={i} className="v3-terminal__line">
            {line.type === 'command' && (
              <span className="v3-terminal__prompt">{prompt}&nbsp;</span>
            )}
            <span style={{ color: lineColor(line.type) }}>{line.text}</span>
          </div>
        ))}
        <div className="v3-terminal__line">
          <span className="v3-terminal__prompt">{prompt}&nbsp;</span>
          <span
            className="v3-terminal__cursor"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          >
            ▋
          </span>
        </div>
        <div ref={bottomRef} />
      </div>

      <style>{`
        .v3-terminal {
          position: relative;
          background: var(--v3-color-crt-bg);
          border-radius: var(--v3-radius-lg);
          border: 1px solid rgba(165, 243, 252, 0.14);
          overflow: hidden;
          font-family: var(--v3-font-terminal);
          font-size: var(--v3-size-terminal);
          line-height: var(--v3-leading-terminal);
          letter-spacing: var(--v3-tracking-terminal);
        }

        /* CRT scanlines */
        .v3-terminal__scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.08) 2px,
            rgba(0, 0, 0, 0.08) 4px
          );
          pointer-events: none;
          z-index: 10;
        }

        .v3-terminal__body {
          position: relative;
          z-index: 20;
          padding: var(--v3-space-6);
          max-height: 320px;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .v3-terminal__body::-webkit-scrollbar { display: none; }

        .v3-terminal__line {
          display: flex;
          align-items: baseline;
          min-height: 1.6em;
        }

        .v3-terminal__prompt {
          color: var(--v3-color-primary);
          user-select: none;
          flex-shrink: 0;
        }

        .v3-terminal__cursor {
          color: var(--v3-color-crt-text);
          transition: opacity 80ms step-end;
        }
      `}</style>
    </div>
  )
}
