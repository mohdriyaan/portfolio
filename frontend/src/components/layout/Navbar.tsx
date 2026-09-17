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

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <button className="brand" onClick={handleHome} aria-label="Go to homepage">
          <span>MR</span>
          <em>Full-stack developer</em>
        </button>

        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Menu</span>
        </button>

        <nav id="primary-nav" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {isCaseStudy ? (
            <button className="nav-link" onClick={handleHome}>Back to work</button>
          ) : (
            <>
              <a href="#work" onClick={closeMenu}>Work</a>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </>
          )}
        </nav>

        <div className="nav-actions">
          <LinkButton variant="secondary" href="/Mohammed_Riyaan_Resume.pdf" download="Mohammed_Riyaan_Resume.pdf">
            Résumé
          </LinkButton>
          <button className="theme-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </header>
  )
}
