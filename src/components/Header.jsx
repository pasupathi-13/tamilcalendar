import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-tamil">தமிழ் நாட்காட்டி</span>
          <span className="logo-eng">Tamil Calendar</span>
        </div>
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/daily" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Daily</NavLink>
          <NavLink to="/monthly" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Monthly</NavLink>
          <NavLink to="/nalla-neram" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Nalla Neram</NavLink>
          <NavLink to="/muhurtham" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Muhurtham</NavLink>
          <NavLink to="/festivals" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Festivals</NavLink>
          <NavLink to="/holidays" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Holidays</NavLink>
          <NavLink to="/chandrashtamam" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Chandrashtamam</NavLink>
        </nav>
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">☰</button>
      </div>
    </header>
  );
};

export default Header;