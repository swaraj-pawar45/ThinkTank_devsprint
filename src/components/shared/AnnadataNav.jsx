import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Languages, Menu, X } from 'lucide-react';
import './AnnadataNav.css';

const AnnadataNav = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी' },
    { code: 'BN', name: 'বাঙালি' },
    { code: 'TA', name: 'தமிழ்' }
  ];

  return (
    <nav className="annadata-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ANNADATA <span>CONNECT</span>
        </Link>
        <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/donor" className={({ isActive }) => isActive ? 'active' : ''}>Donor</NavLink>
          <NavLink to="/beneficiary" className={({ isActive }) => isActive ? 'active' : ''}>Beneficiary</NavLink>
          <NavLink to="/ngo" className={({ isActive }) => isActive ? 'active' : ''}>NGO</NavLink>
          <NavLink to="/government" className={({ isActive }) => isActive ? 'active' : ''}>Government</NavLink>
          <NavLink to="/volunteer" className={({ isActive }) => isActive ? 'active' : ''}>Volunteer</NavLink>
          <NavLink to="/impact" className={({ isActive }) => isActive ? 'active' : ''}>Impact</NavLink>
          
          <div className="nav-cta-group desktop-only">
            <div className="lang-switcher">
              <button 
                className="btn-lang" 
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Select Language"
              >
                <Languages size={20} />
                <span>{currentLang}</span>
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  {languages.map(lang => (
                    <button 
                      key={lang.code} 
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangOpen(false);
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/donor" className="btn-primary">Post Surplus →</Link>
          </div>
        </div>

        <div className="mobile-actions desktop-hidden">
          <button className="btn-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AnnadataNav;
