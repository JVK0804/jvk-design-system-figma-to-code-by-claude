import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'heritage-cream':   '#E8E4D9',
        'cream-bright':     '#F5F2EB',
        'cream-shadow':     '#D4CFBF',
        'teal-deep':        '#0E7490',
        'teal-volt':        '#22B8CF',
        'teal-phosphor':    '#A5F3FC',
        'ink':              '#1C1A14',
        'ink-muted':        '#5A5648',
        'ink-disabled':     '#9A9488',
        'ai-purple':        '#7C3AED',
        'ai-purple-hover':  '#6D28D9',
        'ai-purple-mid':    '#C4B5FD',
        'ai-purple-light':  '#EDE9FE',
        'ai-purple-pale':   '#F5F3FF',
        'ai-success':       '#16A34A',
        'ai-warning':       '#D97706',
        'ai-error':         '#DC2626',
        'code-bg':          '#0D1117',
        'code-header':      '#161B22',
      },
      fontFamily: {
        'display':         ['SF Pro Display', 'system-ui', 'sans-serif'],
        'body':            ['SF Pro Text',    'system-ui', 'sans-serif'],
        'mono':            ['SF Mono', 'JetBrains Mono', 'monospace'],
        'mono-space':      ['var(--font-mono-space)', 'monospace'],
        'serif-fraunces':  ['var(--font-serif-fraunces)', 'serif'],
        'serif-playfair':  ['var(--font-serif-playfair)', 'serif'],
        'serif-dm':        ['var(--font-serif-dm)',        'serif'],
      },
      fontSize: {
        'display': ['80px', { lineHeight: '1.0',  letterSpacing: '-0.05em', fontWeight: '200' }],
        'h1':      ['52px', { lineHeight: '1.1',  letterSpacing: '-0.04em', fontWeight: '200' }],
        'h2':      ['28px', { lineHeight: '1.2',  letterSpacing: '-0.03em', fontWeight: '400' }],
        'h3':      ['20px', { lineHeight: '1.3',  letterSpacing: '-0.02em', fontWeight: '500' }],
        'body':    ['16px', { lineHeight: '1.75', letterSpacing: '-0.01em', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '1.5',  letterSpacing: '0em',     fontWeight: '400' }],
        'label':   ['11px', { lineHeight: '1.4',  letterSpacing: '0.08em',  fontWeight: '500' }],
        'terminal':['13px', { lineHeight: '1.6',  letterSpacing: '0.12em',  fontWeight: '400' }],
      },
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '6':  '24px',
        '8':  '32px',
        '12': '48px',
        '20': '80px',
        '28': '112px',
      },
      borderRadius: {
        'sm':   '4px',
        'md':   '8px',
        'lg':   '14px',
        'xl':   '20px',
        'pill': '100px',
      },
      backdropBlur: {
        'glass': '12px',
        'nav':   '20px',
      },
    },
  },
  plugins: [],
}

export default config
