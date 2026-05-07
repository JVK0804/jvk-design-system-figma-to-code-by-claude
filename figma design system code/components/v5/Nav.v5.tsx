'use client'

import { useThemeV5 } from './ThemeProvider.v5'
import { motion } from 'framer-motion'

interface NavItem {
  label: string
  href: string
  icon?: string
}

interface NavV5Props {
  items: NavItem[]
  logo?: string
  ctaLabel?: string
  onCtaClick?: () => void
}

/*
 * v5 Responsive Nav
 * ≥768px → horizontal top nav bar
 * <768px → fixed bottom tab bar (mobile)
 * Theme toggle built in. No external routing dependency.
 */
export function NavV5({ items, logo = 'JVK', ctaLabel = 'Hire me', onCtaClick }: NavV5Props) {
  const { theme, toggle } = useThemeV5()

  return (
    <>
      {/* Desktop nav */}
      <nav className="v5-nav v5-nav--desktop" role="navigation" aria-label="Main">
        <span className="v5-nav__logo">{logo}</span>
        <ul className="v5-nav__links" role="list">
          {items.map(item => (
            <li key={item.href}>
              <a href={item.href} className="v5-nav__link">{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="v5-nav__actions">
          <button
            className="v5-nav__theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '◑' : '◐'}
          </button>
          <motion.button
            className="v5-nav__cta"
            onClick={onCtaClick}
            whileTap={{ scale: 0.97 }}
          >
            {ctaLabel}
          </motion.button>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="v5-nav v5-nav--mobile" role="navigation" aria-label="Main">
        {items.map(item => (
          <a key={item.href} href={item.href} className="v5-nav__tab">
            {item.icon && <span className="v5-nav__tab-icon" aria-hidden>{item.icon}</span>}
            <span className="v5-nav__tab-label">{item.label}</span>
          </a>
        ))}
        <button
          className="v5-nav__tab"
          onClick={toggle}
          aria-label="Toggle theme"
        >
          <span className="v5-nav__tab-icon" aria-hidden>{theme === 'light' ? '◑' : '◐'}</span>
          <span className="v5-nav__tab-label">Theme</span>
        </button>
      </nav>

      <style>{`
        /* ── Shared ── */
        .v5-nav {
          background: var(--v5-color-nav);
          transition: background 300ms ease;
        }

        /* ── Desktop (≥768px) ── */
        .v5-nav--desktop {
          display: none;
          align-items: center;
          gap: var(--v5-space-8);
          padding: 0 var(--v5-space-12);
          height: 60px;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--v5-color-border);
        }

        @media (min-width: 768px) {
          .v5-nav--desktop { display: flex; }
          .v5-nav--mobile  { display: none;  }
        }

        .v5-nav__logo {
          font-size: 15px;
          font-weight: 600;
          color: var(--v5-color-primary);
          margin-right: auto;
        }

        .v5-nav__links {
          display: flex;
          gap: var(--v5-space-8);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .v5-nav__link {
          font-size: var(--v5-size-caption);
          color: var(--v5-color-text-muted);
          text-decoration: none;
          transition: color 150ms ease;
        }
        .v5-nav__link:hover { color: var(--v5-color-primary); }

        .v5-nav__actions {
          display: flex;
          align-items: center;
          gap: var(--v5-space-3);
        }

        .v5-nav__theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: var(--v5-color-text-muted);
          padding: var(--v5-space-2);
          line-height: 1;
          transition: color 150ms ease;
        }
        .v5-nav__theme-toggle:hover { color: var(--v5-color-primary); }

        .v5-nav__cta {
          background: var(--v5-color-primary);
          color: var(--v5-color-surface);
          border: none;
          border-radius: var(--v5-radius-md);
          padding: var(--v5-space-2) var(--v5-space-4);
          font-size: var(--v5-size-caption);
          font-weight: 600;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .v5-nav__cta:hover { background: var(--v5-color-primary-hover); }

        /* ── Mobile bottom tabs (<768px) ── */
        .v5-nav--mobile {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          border-top: 1px solid var(--v5-color-border);
          padding-bottom: env(safe-area-inset-bottom);
        }

        .v5-nav__tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 10px 4px;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--v5-color-text-muted);
          transition: color 150ms ease;
        }
        .v5-nav__tab:hover,
        .v5-nav__tab:focus { color: var(--v5-color-primary); }

        .v5-nav__tab-icon { font-size: 18px; line-height: 1; }
        .v5-nav__tab-label { font-size: 10px; font-weight: 500; }
      `}</style>
    </>
  )
}
