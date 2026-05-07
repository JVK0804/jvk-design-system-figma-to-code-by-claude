# Design System v1 — Heritage Cream × Cerulean Teal

**Theme:** Zillennial Bridge | Heritage Cream base  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion  
**Token file:** `styles/tokens.v1.css`

---

## Overview

v1 is the foundation version — the warmest, most saturated cream in the palette. Where v2 uses Cream Bright (`#F5F2EB`), v1 uses the original Heritage Cream (`#E8E4D9`) giving a slightly toasted, organic warmth. The teal accent is identical across both versions.

---

## Color Tokens

| Token | Value | Role |
|-------|-------|------|
| `--v1-color-bg` | `#E8E4D9` | Canvas background |
| `--v1-color-cream-bright` | `#F5F2EB` | Surface / card bg |
| `--v1-color-cream-shadow` | `#D4CFBF` | Pressed state / border |
| `--v1-color-primary` | `#0E7490` | Cerulean Teal — primary accent |
| `--v1-color-primary-hover` | `#22B8CF` | Teal Volt — hover state |
| `--v1-color-primary-phosphor` | `#A5F3FC` | Teal Phosphor — highlight |
| `--v1-color-primary-subtle` | `rgba(14,116,144,0.10)` | Tag / badge background |
| `--v1-color-primary-border` | `rgba(14,116,144,0.28)` | Tag / badge border |
| `--v1-color-ink` | `#1C1A14` | Text primary |
| `--v1-color-ink-muted` | `#5A5648` | Text secondary |
| `--v1-color-ink-disabled` | `#9A9488` | Text disabled / placeholder |

---

## Glass Tokens

| Token | Value |
|-------|-------|
| `--v1-glass-bg` | `rgba(232, 228, 217, 0.45)` |
| `--v1-glass-specular-from` | `rgba(255, 255, 255, 0.32)` |
| `--v1-glass-specular-to` | `rgba(255, 255, 255, 0.06)` |
| `--v1-glass-glint` | `rgba(255, 255, 255, 0.80)` |
| `--v1-border-glass` | `1px solid rgba(255, 255, 255, 0.55)` |
| `--v1-blur-glass` | `blur(12px)` |

---

## Components

### GlassCardV1

Five-layer glass card on Heritage Cream background.

```tsx
import { GlassCardV1 } from '@/components/v1/GlassCard.v1'

<GlassCardV1 withGrain>
  <p>Content</p>
</GlassCardV1>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Card content |
| `withGrain` | `boolean` | `false` | Renders grain texture overlay |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | — | Inline styles |

**Layer composition:**
1. Scene grain (parent-owned, opt-in via `withGrain`)
2. Heritage Cream canvas (`#E8E4D9`)
3. Glass fill — `rgba(232,228,217,0.45)` + `backdrop-filter: blur(12px)`
4. Specular `::before` — 135° gradient, 32% → 6% white
5. Glint `::after` — 1px top edge, 80% white centre

---

### HapticButtonV1

Spring-animated button with 6 variants. Uses the shared `useHapticPress` hook.

```tsx
import { HapticButtonV1 } from '@/components/v1/HapticButton.v1'

<HapticButtonV1 variant="primary" onClick={handleClick}>
  Get started
</HapticButtonV1>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'primary' \| 'pill' \| 'secondary' \| 'ghost' \| 'disabled'` | `'primary'` |
| `onClick` | `() => void` | — |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` |

**Spring parameters (from `useHapticPress`):**
- Press: `scale(0.955)` over `30ms`
- Return: spring to `scale(1.018)` → `scale(1.0)` — stiffness 520, damping 22, mass 0.6

---

### TagV1

Teal-accented label chip.

```tsx
import { TagV1 } from '@/components/v1/Tag.v1'

<TagV1 size="md">Figma</TagV1>
<TagV1 size="sm">v1</TagV1>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'md' \| 'sm'` | `'md'` |

- `md`: 28px height, 13px font
- `sm`: 22px height, 11px font, uppercase, +0.08em tracking

---

## Setup

1. Import tokens at the root:
```tsx
// app/layout.tsx
import '@/components/styles/tokens.v1.css'
```

2. Set the canvas background:
```css
body {
  background-color: var(--v1-color-bg);
  color: var(--v1-color-ink);
}
```

3. Ensure `backdrop-filter` works by placing cards above a visible background (not `transparent`).

---

## Design Decisions

- **Why `#E8E4D9` not `#F5F2EB`?** The Heritage Cream is the original Figma token — warmer and more visually distinct from white. v2 lightened it to Cream Bright for the coded version; v1 keeps the source value.
- **Glass opacity at 45%** — enough translucency to show the grain texture underneath without making the card invisible.
- **Specular at 32%** — slightly brighter than v2 (28%) because the warmer cream base absorbs more light and needs the extra highlight to read clearly.
