# Design System v3 — Deep Ink × Teal Phosphor

**Theme:** Zillennial Bridge | Dark Mode · CRT Terminal  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion  
**Token file:** `styles/tokens.v3.css`

---

## Overview

v3 is the dark inversion of the Heritage Cream system. The canvas flips to Deep Ink (`#1C1A14`) and the accent shifts from Cerulean Teal to Teal Phosphor (`#A5F3FC`) — the brightest point of the teal ramp, which achieves WCAG AA contrast on the dark surface. A CRT terminal component introduces an Anonymous Pro monospace layer with scanline aesthetics.

---

## Color Tokens

| Token | Value | Role |
|-------|-------|------|
| `--v3-color-bg` | `#1C1A14` | Deep Ink canvas |
| `--v3-color-surface` | `#252118` | Raised card surface |
| `--v3-color-surface-raised` | `#2E2B22` | Further elevated surface |
| `--v3-color-primary` | `#A5F3FC` | Teal Phosphor — primary accent |
| `--v3-color-primary-dim` | `#22B8CF` | Teal Volt — dimmed state / hover |
| `--v3-color-primary-subtle` | `rgba(165,243,252,0.10)` | Tag background |
| `--v3-color-primary-border` | `rgba(165,243,252,0.24)` | Tag border |
| `--v3-color-text` | `#E8E4D9` | Heritage Cream — text on dark |
| `--v3-color-text-muted` | `#9A9488` | Secondary text |
| `--v3-color-text-disabled` | `#5A5648` | Disabled / placeholder |

---

## Glass Tokens (Dark)

| Token | Value |
|-------|-------|
| `--v3-glass-bg` | `rgba(28, 26, 20, 0.65)` |
| `--v3-glass-specular-from` | `rgba(255, 255, 255, 0.08)` |
| `--v3-glass-specular-to` | `rgba(255, 255, 255, 0.01)` |
| `--v3-glass-glint` | `rgba(255, 255, 255, 0.06)` |
| `--v3-border-glass` | `1px solid rgba(255, 255, 255, 0.10)` |
| `--v3-blur-glass` | `blur(12px)` |

---

## CRT Terminal Tokens

| Token | Value |
|-------|-------|
| `--v3-font-terminal` | `'Anonymous Pro', monospace` |
| `--v3-color-crt-text` | `#A5F3FC` |
| `--v3-color-crt-dim` | `rgba(165,243,252,0.45)` |
| `--v3-color-crt-bg` | `#0A0F0C` |
| `--v3-size-terminal` | `13px` |
| `--v3-tracking-terminal` | `0.12em` |

---

## Components

### GlassCardV3

Dark glass card — ink base, subtle specular, minimal glint.

```tsx
import { GlassCardV3 } from '@/components/v3/GlassCard.v3'

<GlassCardV3>
  <p>Content</p>
</GlassCardV3>
```

No `withGrain` prop — grain texture is redundant on dark surfaces (noise dissolves into the dark field).

**Layer composition:**
1. Deep Ink canvas (`#1C1A14`)
2. Glass fill — `rgba(28,26,20,0.65)` + `backdrop-filter: blur(12px)`
3. Specular `::before` — 135°, 8% → 1% white (subtle, not harsh)
4. Glint `::after` — 1px top edge at 6% white

---

### HapticButtonV3

Dark-mode haptic button. Primary uses Phosphor bg + Ink text (inverted) because Phosphor is a light colour.

```tsx
import { HapticButtonV3 } from '@/components/v3/HapticButton.v3'

<HapticButtonV3 variant="primary">Launch</HapticButtonV3>
<HapticButtonV3 variant="secondary">Cancel</HapticButtonV3>
```

| Variant | Background | Text |
|---------|-----------|------|
| `primary` | `#A5F3FC` (Phosphor) | `#1C1A14` (Ink) |
| `pill` | `#A5F3FC` (Phosphor) | `#1C1A14` (Ink) |
| `secondary` | Transparent | `#A5F3FC` + Phosphor border |
| `ghost` | Transparent | `#A5F3FC` |
| `disabled` | `#2E2B22` | `#5A5648` |

---

### TagV3

Phosphor-accented label chip on dark surface.

```tsx
import { TagV3 } from '@/components/v3/Tag.v3'

<TagV3 size="md">Dark mode</TagV3>
<TagV3 size="sm">v3</TagV3>
```

---

### TerminalBlockV3

CRT-aesthetic terminal with typewriter mode, scanline overlay, and blinking cursor.

```tsx
import { TerminalBlockV3 } from '@/components/v3/TerminalBlock.v3'

const lines = [
  { type: 'comment', text: '# design system v3' },
  { type: 'command', text: 'npm run build' },
  { type: 'output',  text: '✓ compiled in 240ms' },
  { type: 'command', text: 'git push origin main' },
  { type: 'output',  text: '✓ pushed 12 files' },
]

<TerminalBlockV3 lines={lines} typewriter prompt="❯" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `TerminalLine[]` | — | Lines to display |
| `prompt` | `string` | `'❯'` | Prompt character |
| `typewriter` | `boolean` | `false` | Stream lines one at a time |
| `className` | `string` | `''` | — |

**TerminalLine type:**
```ts
interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'comment'
  text: string
}
```

Line colours: command = Phosphor, output = 75% Phosphor, error = `#FF6B6B`, comment = 45% Phosphor.

**Scanline effect:** CSS `repeating-linear-gradient` at 4px intervals, 8% black — no canvas, no SVG, zero JS.

---

## Setup

1. Import tokens:
```tsx
import '@/components/styles/tokens.v3.css'
```

2. Set dark canvas:
```css
body {
  background-color: var(--v3-color-bg);
  color: var(--v3-color-text);
}
```

3. Load Anonymous Pro (Google Fonts):
```tsx
// app/layout.tsx
import { Anonymous_Pro } from 'next/font/google'
const anonymousPro = Anonymous_Pro({ weight: '400', subsets: ['latin'] })
```

---

## Design Decisions

- **Why Phosphor and not Teal Volt as primary?** Phosphor (`#A5F3FC`) achieves a higher contrast ratio on `#1C1A14` (≈ 9.8:1) vs Teal Volt's `#22B8CF` (≈ 5.1:1). On dark backgrounds, push to the brightest point of the ramp.
- **Glass at 65% opacity** — dark glass needs higher opacity than light glass to differentiate from the background. 45% (v1) would make it invisible against `#1C1A14`.
- **No grain on dark cards** — grain is a light-scattering phenomenon on cream. On dark surfaces it just adds visual noise with no benefit.
- **Inverted primary button** — a teal button with teal text on dark would be invisible. Phosphor bg + Ink text gives a deliberate, high-contrast "glow" quality.
