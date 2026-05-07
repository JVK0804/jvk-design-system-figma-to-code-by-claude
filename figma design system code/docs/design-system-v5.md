# Design System v5 — Light × Dark × Responsive

**Theme:** Zillennial Bridge | Adaptive  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion  
**Token file:** `styles/tokens.v5.css`

---

## Overview

v5 unifies the Light (v1/v2) and Dark (v3) worlds into a single adaptive system. Theme is controlled via `[data-theme]` on `<html>` — set by `ThemeProviderV5` which respects `localStorage` and `prefers-color-scheme`. All components read from `--v5-*` tokens; no component-level JS is needed to respond to theme changes.

Responsive breakpoints: **390 → 768 → 1024 → 1440px**.

---

## Architecture

```
ThemeProviderV5       → sets [data-theme] on <html>
  tokens.v5.css       → :root (light) + [data-theme="dark"] overrides
    GlassCardV5       → reads --v5-glass-* (auto-adapts)
    NavV5             → desktop top-bar + mobile bottom tabs
    HapticButtonV1    → light variant (compose as needed)
    HapticButtonV3    → dark variant (compose as needed)
```

---

## Theme Tokens

### Light Mode (`:root`, `[data-theme="light"]`)

| Token | Value |
|-------|-------|
| `--v5-color-bg` | `#F5F2EB` |
| `--v5-color-surface` | `#FFFFFF` |
| `--v5-color-primary` | `#0E7490` |
| `--v5-color-primary-hover` | `#22B8CF` |
| `--v5-color-text` | `#1C1A14` |
| `--v5-color-text-muted` | `#5A5648` |
| `--v5-color-nav` | `#ECEAE5` |
| `--v5-color-border` | `#D4CFBF` |

### Dark Mode (`[data-theme="dark"]`)

| Token | Value |
|-------|-------|
| `--v5-color-bg` | `#1C1A14` |
| `--v5-color-surface` | `#252118` |
| `--v5-color-primary` | `#22B8CF` |
| `--v5-color-primary-hover` | `#A5F3FC` |
| `--v5-color-text` | `#E8E4D9` |
| `--v5-color-text-muted` | `#9A9488` |
| `--v5-color-nav` | `#141210` |
| `--v5-color-border` | `#2E2B22` |

---

## Components

### ThemeProviderV5

Wrap the root layout. Handles localStorage + system preference.

```tsx
// app/layout.tsx
import { ThemeProviderV5 } from '@/components/v5/ThemeProvider.v5'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderV5 defaultTheme="light">
          {children}
        </ThemeProviderV5>
      </body>
    </html>
  )
}
```

| Prop | Type | Default |
|------|------|---------|
| `defaultTheme` | `'light' \| 'dark'` | `'light'` |
| `storageKey` | `string` | `'jvk-ds-theme'` |

### useThemeV5

```tsx
import { useThemeV5 } from '@/components/v5/ThemeProvider.v5'

const { theme, toggle, setTheme } = useThemeV5()
```

| Return | Type | Description |
|--------|------|-------------|
| `theme` | `'light' \| 'dark'` | Current theme |
| `toggle` | `() => void` | Flip between light and dark |
| `setTheme` | `(t) => void` | Set explicitly |

---

### GlassCardV5

Single component — adapts automatically via CSS tokens.

```tsx
import { GlassCardV5 } from '@/components/v5/GlassCard.v5'

<GlassCardV5 withGrain>
  <p>Adapts to light and dark automatically.</p>
</GlassCardV5>
```

No theme prop needed. The `--v5-glass-*` tokens switch when `[data-theme]` changes.

---

### NavV5

Responsive nav — top bar on desktop, bottom tabs on mobile.

```tsx
import { NavV5 } from '@/components/v5/Nav.v5'

const items = [
  { label: 'Work',    href: '/work',    icon: '□' },
  { label: 'About',   href: '/about',   icon: '○' },
  { label: 'Lab',     href: '/lab',     icon: '◆' },
  { label: 'Contact', href: '/contact', icon: '@' },
]

<NavV5 items={items} logo="JVK" ctaLabel="Hire me" onCtaClick={handleCta} />
```

| Prop | Type | Default |
|------|------|---------|
| `items` | `NavItem[]` | — |
| `logo` | `string` | `'JVK'` |
| `ctaLabel` | `string` | `'Hire me'` |
| `onCtaClick` | `() => void` | — |

**Breakpoint behaviour:**
- `≥ 768px` — sticky horizontal nav, logo left, links centre, theme toggle + CTA right
- `< 768px` — fixed bottom tab bar with icon + label, theme toggle tab appended

---

## Responsive Breakpoints

| Name | Width | Layout |
|------|-------|--------|
| Mobile | 390px | Full-width stacked, bottom nav, 20px padding |
| Tablet | 768px | 2-column grid, collapsible sidebar, 32px padding |
| Laptop | 1024px | 2–3 col grid, horizontal nav, 48px padding |
| Desktop | 1440px | Max 1280px centred, spacious grid, full nav |

Use in CSS:
```css
@media (min-width: 768px) { /* tablet+ */ }
@media (min-width: 1024px) { /* laptop+ */ }
@media (min-width: 1440px) { /* desktop */ }
```

---

## Setup

1. Import tokens (must be before any component):
```tsx
// app/layout.tsx
import '@/components/styles/tokens.v5.css'
```

2. Wrap with `ThemeProviderV5` (see above).

3. On body — theme transitions:
```css
body {
  background-color: var(--v5-color-bg);
  color: var(--v5-color-text);
  transition: background-color 300ms ease, color 300ms ease;
}
```

---

## Design Decisions

- **`[data-theme]` on `<html>` not `<body>`** — allows CSS selectors to reach nav elements that sit outside `<body>` in some SSR contexts, and avoids flash-of-unstyled-content issues with Next.js.
- **System preference fallback** — `@media (prefers-color-scheme: dark)` in the CSS covers the case where JS hasn't run yet (SSR), preventing a light flash before hydration.
- **No JS in GlassCard for theme switching** — all adaptation is CSS. This keeps the component pure and avoids unnecessary re-renders on toggle.
- **Bottom tab bar not hamburger** — mobile users reach the bottom of the screen more naturally (thumb zone). Hamburger menus add a tap to every navigation action.
- **Theme toggle in both nav positions** — user expects to find it where they found it last. Placing it in both the desktop nav and mobile tab bar removes that friction.
