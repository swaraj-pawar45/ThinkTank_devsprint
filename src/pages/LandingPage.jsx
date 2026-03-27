import React from 'react';
import { NavLink } from 'react-router-dom';
import ParticleField from '../components/three/ParticleField';
import ImpactOrb from '../components/three/ImpactOrb';
import { ShieldCheck, HeartPulse, Recycle, Map } from 'lucide-react';
import { useStore } from '../store/useStore';
import './LandingPage.css';

const LandingPage = () => {
  const { impactStats } = useStore();

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
            India's Intelligent Food Bridge Platform — connecting surplus to the underserved with blockchain accountability.
          </p>
          <div className="hero-actions">
            <NavLink to="/donor" className="btn-primary btn-large">Post Surplus →</NavLink>
            <button className="btn-outline">See How It Works</button>
          </div>
        </div>

        <div className="hero-stats fade-up stagger-2">
          <div className="hero-stat-card">
            <div className="stat-label">Meals Delivered</div>
            <div className="stat-value font-mono">{impactStats.totalMeals.toLocaleString('en-IN')}</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-label">Districts Active</div>
            <div className="stat-value font-mono">247</div>
          </div>
          <div className="hero-stat-card">
            <div className="stat-label">Donors Active</div>
            <div className="stat-value font-mono">1,120</div>
          </div>
        </div>
      </section>

      <section className="problem-section container">
        <div className="problem-grid">
          <div className="problem-metric fade-up">
            <h3 className="font-mono">₹2.13L CR.</h3>
            <p>Annual food subsidy spend. Still 194 Million hungry.</p>
          </div>
          <div className="problem-chart fade-up stagger-2">
            <div className="leakage-bar">
              <span className="label">Systemic Leakage: 18.4%</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: '18.4%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-inverse-section">
        <div className="container">
          <div className="impact-inverse-grid">
            <div className="impact-inverse-copy fade-up">
              <h2>The 19.5× Thesis</h2>
              <p>By saving {impactStats.leakageReduced}% of leakage, we unlock ₹1,065 Crore—enough to change 5 crore lives.</p>
              <div className="impact-amount font-mono">₹1,065,00,00,000</div>
            </div>
            <div className="impact-inverse-viz animate-pulse">
              <ImpactOrb />
            </div>
          </div>
        </div>
      </section>

      <section className="audience-section container">
        <h2 className="section-title fade-up">Collaborative Action</h2>
        <div className="audience-grid">
          <div className="audience-card card fade-up stagger-1">
            <div className="card-icon"><Recycle size={32} /></div>
            <h3>Bulk Donor</h3>
            <p>Hotels and markets can connect surplus to vetted NGOs instantly.</p>
          </div>
          <div className="audience-card card fade-up stagger-2">
            <div className="card-icon"><ShieldCheck size={32} /></div>
            <h3>NGO Partner</h3>
            <p>Distribute verified food with real-time tracking.</p>
          </div>
          <div className="audience-card card fade-up stagger-3">
            <div className="card-icon"><Map size={32} /></div>
            <h3>Government</h3>
            <p>Heatmap intelligence on need points.</p>
          </div>
          <div className="audience-card card fade-up stagger-3">
            <div className="card-icon"><HeartPulse size={32} /></div>
            <h3>Beneficiaries</h3>
            <p>Dignified access through FPS and NGOs.</p>
          </div>
        </div>
      </section>

      <footer className="footer shadow-top">
        <div className="container footer-content">
          <div className="footer-brand font-display">ANNADATA CONNECT</div>
          <div className="footer-links">
            <a href="#">Security Audit</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
