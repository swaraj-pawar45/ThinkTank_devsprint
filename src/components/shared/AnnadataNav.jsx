import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Languages, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AnnadataNav.css';

const AnnadataNav = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const { user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी' },
    { code: 'BN', name: 'বাঙালি' }
  ];

  return (
    <nav className="annadata-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          ANNADATA <span>CONNECT</span>
        </Link>
        
        <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          {/* Navigation Links (Visible based on context) */}
          <NavLink to="/impact" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Impact</NavLink>
          
          {user && (
            <>
              <NavLink to={`/${user.role}`} className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                My {user.role.toUpperCase()} Hub
              </NavLink>
              <button className="nav-logout-btn" onClick={handleLogout}>
                <LogOut size={18} /> <span>Logout</span>
              </button>
            </>
          )}

          {!user && (
            <div className="nav-cta-group">
              <div className="lang-switcher">
                <button className="btn-lang" onClick={() => setLangOpen(!langOpen)}>
                  <Languages size={20} />
                  <span>{currentLang}</span>
                </button>
                {langOpen && (
                  <div className="lang-dropdown">
                    {languages.map(l => (
                      <button key={l.code} onClick={() => { setCurrentLang(l.code); setLangOpen(false); }}>{l.name}</button>
                    ))}
                  </div>
                )}
              </div>
              <button className="btn-outline" onClick={() => { openAuthModal('login'); setMenuOpen(false); }}>Log In</button>
              <button className="btn-primary" onClick={() => { openAuthModal('signup'); setMenuOpen(false); }}>Sign Up</button>
            </div>
          )}
        </div>

        <div className="mobile-actions desktop-hidden">
          {user && (
            <div className="mobile-user-badge">
              <UserIcon size={18} />
              <span>{user.name}</span>
            </div>
          )}
          <button className="btn-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AnnadataNav;
