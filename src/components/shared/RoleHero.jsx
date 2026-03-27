import React from 'react';
import './RoleHero.css';

const RoleHero = ({ title, subtitle, rightContent }) => {
  return (
    <div className="role-hero-section">
      <div className="role-hero-content">
        <div className="hero-left">
          <div className="hero-text">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        {rightContent && <div className="hero-right">{rightContent}</div>}
      </div>
    </div>
  );
};

export default RoleHero;
