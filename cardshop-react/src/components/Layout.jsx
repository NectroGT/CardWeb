import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useStore } from '../store.jsx';
import { CartIcon, CloseIcon, Logo, MenuIcon, MoonIcon, SunIcon, UserIcon } from './Icons.jsx';

// Scroll to #section links (e.g. /#events) after navigating, otherwise to the top.
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Header() {
  const { dark, toggleTheme, cartCount } = useStore();
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [pathname, hash]);
  const themeLabel = dark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          <Logo />
          <span>[SHOP NAME]</span>
        </Link>
        <nav id="main-nav" aria-label="Main" className={'main-nav' + (menuOpen ? ' open' : '')}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/sell">Sell</NavLink>
          <Link to="/#events">Events</Link>
          <Link to="/#visit" className="nav-cta cutsm">Get directions</Link>
          <button type="button" className="nav-theme" onClick={toggleTheme}>
            {dark ? <SunIcon /> : <MoonIcon />}{dark ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
        <div className="header-actions">
          <Link to="/shop#cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`}>
            <CartIcon />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>
          <NavLink to="/account" className="icon-btn" aria-label="Account"><UserIcon /></NavLink>
          <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label="Menu"
            aria-controls="main-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <span className="brand-name">[SHOP NAME]</span>
        <nav aria-label="Footer">
          <Link to="/shop">Shop</Link>
          <Link to="/#events">Events</Link>
          <Link to="/sell">Sell</Link>
          <Link to="/#join">Join the list</Link>
          <Link to="/#visit">Visit</Link>
        </nav>
        <span>© 2026 [SHOP NAME]</span>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { dark } = useStore();
  return (
    <div className={'app ' + (dark ? 'theme-dark' : 'theme-light')}>
      <ScrollToHash />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}
