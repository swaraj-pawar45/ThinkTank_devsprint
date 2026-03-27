import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/three/ParticleField';
import ImpactOrb from '../components/three/ImpactOrb';
import { ShieldCheck, HeartPulse, Recycle, Map, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
  const { impactStats } = useStore();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleAction = (path, role = null) => {
    if (user) {
      if (role && user.role !== role) {
        openAuthModal('login'); // Wrong role → prompt re-login
      } else {
        navigate(path);
      }
    } else {
      openAuthModal('signup');
    }
  };

  return (
    <div className="landing-page">
      
      <section className="hero">
        <ParticleField />
        <div className="hero-content fade-up stagger-1">
          <h1 className="hero-title">
            <span className="hindi-label">80 करोड़ लोगों तक</span><br />
            Feeding Bharat with Digital Integrity.
          </h1>
          <p className="hero-subtitle">
            The intelligent bridge connecting surplus food hubs to the underserved with blockchain-verified accountability.
          </p>
          <div className="hero-actions">
            <button onClick={() => handleAction('/donor', 'donor')} className="btn-primary btn-large">Post Surplus →</button>
            <button onClick={() => handleAction('/beneficiary', 'beneficiary')} className="btn-outline">Find Food Near Me</button>
          </div>
        </div>

        <div className="hero-stats fade-up stagger-2">
          <div className="hero-stat-card">
            <div className="stat-label">Meals Delivered</div>
            <div className="stat-value font-mono">{impactStats.totalMeals.toLocaleString('en-IN')}</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-label">Districts Active</div>
            <div className="stat-value font-mono">{impactStats.districts}</div>
          </div>
        </div>
      </section>

      <section className="audience-section container">
        <h2 className="section-title fade-up">Access Your Dashboard</h2>
        <div className="audience-grid">
          <div className="audience-card card fade-up stagger-1 clickable" onClick={() => handleAction('/donor', 'donor')}>
            <div className="card-icon"><Recycle size={32} /></div>
            <h3>Bulk Donor</h3>
            <p>Hotels, Weddings, and Businesses connecting surplus to NGOs.</p>
          </div>
          <div className="audience-card card fade-up stagger-2 clickable" onClick={() => handleAction('/ngo', 'ngo')}>
            <div className="card-icon"><ShieldCheck size={32} /></div>
            <h3>NGO Partner</h3>
            <p>Verification & distribution hub for mapped hungry clusters.</p>
          </div>
          <div className="audience-card card fade-up stagger-3 clickable" onClick={() => handleAction('/volunteer', 'volunteer')}>
            <div className="card-icon"><Users size={32} /></div>
            <h3>Volunteer</h3>
            <p>The last-mile bridge moving food from hub to beneficiary.</p>
          </div>
          <div className="audience-card card fade-up stagger-3 clickable" onClick={() => handleAction('/government', 'government')}>
            <div className="card-icon"><Map size={32} /></div>
            <h3>District Admin</h3>
            <p>National-level visibility on hunger-points and distribution data.</p>
          </div>
        </div>
      </section>

      <section className="impact-inverse-section">
        <div className="container">
          <div className="impact-inverse-grid">
            <div className="impact-inverse-copy fade-up">
              <h2>The 19.5× Thesis</h2>
              <p>By using ANNADATA Brain to save just 0.5% of subsidy leakage, we unlock ₹1,065 Crore—enough to change 50 million lives.</p>
              <div className="impact-amount font-mono">₹1,065,00,00,000</div>
            </div>
            <div className="impact-inverse-viz animate-pulse">
              <ImpactOrb />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer shadow-top">
        <div className="container footer-content">
          <div className="footer-brand font-display">ANNADATA CONNECT</div>
          <div className="footer-links">
            <a href="#">Security Audit</a>
            <a href="#">Accessibility</a>
            <a onClick={() => openAuthModal('login')} className="clickable">Go to Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

