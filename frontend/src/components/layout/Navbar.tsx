import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { LinkButton } from '../ui/Button'

type NavbarProps = {
  isCaseStudy: boolean
  onHome: () => void
}

export function Navbar({ isCaseStudy, onHome }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleHome = () => {
    closeMenu()
    onHome()
  }

  const isLight = theme === 'light'

  return (
    <header className="site-header">
      <div className="container nav-shell">
        {/* Brand */}
        <button
          className="brand"
          onClick={handleHome}
          aria-label="Go to homepage"
          style={{ gap: '16px' }}
        >
          <span>MR</span>

          <em
            style={{
              borderLeft: '1px solid color-mix(in srgb, currentColor 20%, transparent)',
              paddingLeft: '16px',
            }}
          >
            Full-stack developer
          </em>
        </button>

        {/* Mobile menu toggle */}
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Menu</span>
        </button>

        {/* Navigation */}
        <nav
          id="primary-nav"
          className={`primary-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Primary navigation"
        >
          {isCaseStudy ? (
            <button className="nav-link" onClick={handleHome}>
              Back to work
            </button>
          ) : (
            <>
              <a href="#work" onClick={closeMenu}>
                Work
              </a>

              <a href="#about" onClick={closeMenu}>
                About
              </a>

              <a href="#contact" onClick={closeMenu}>
                Contact
              </a>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <LinkButton
            variant="primary"
            href="/Mohammed_Riyaan_Resume.pdf"
            download="Mohammed_Riyaan_Resume.pdf"
            style={{
              backgroundColor: '#c7b58a',
              borderColor: '#c7b58a',
              color: '#171715',
            }}
          >
            RESUME
          </LinkButton>

          <button
            className="button button-ghost theme-icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
          >
            {isLight ? (
              /* Moon */
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              /* Sun */
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}