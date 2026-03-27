import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero3D from '../components/three/Hero3D';
import ImpactOrb from '../components/three/ImpactOrb';
import { ShieldCheck, HeartPulse, Recycle, Map, Users, ArrowRight, Zap, Target, Award, Globe, Quote, ChevronDown, CheckCircle } from 'lucide-react';
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
        <Hero3D />
        <div className="hero-content fade-up stagger-1">
          <h1 className="hero-title">
            <span className="hindi-label">80 करोड़ लोगों तक</span><br />
            Feeding Bharat with Digital Integrity.
          </h1>
          <p className="hero-subtitle">
            The intelligent bridge connecting surplus food hubs to the underserved with blockchain-verified accountability.
          </p>
          <div className="hero-actions">
            <button onClick={() => handleAction('/donor', 'donor')} className="btn-primary btn-large shine-active">Post Surplus →</button>
            <button onClick={() => handleAction('/beneficiary', 'beneficiary')} className="btn-outline glass">Find Food Near Me</button>
          </div>
        </div>

        {/* Live Pulse Marquee */}
        <div className="live-pulse-marquee">
          <div className="marquee-content">
            {["BLR Node Active", "DEL Node Active", "MUM Node Active", "HYD Node Active", "PUN Node Active", "KOL Node Active"].map((city, idx) => (
              <React.Fragment key={idx}>
                <span className="dot"></span>
                <span className="city-label font-mono">{city}</span>
              </React.Fragment>
            ))}
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

      <section className="features-showcase container">
        <h2 className="section-title fade-up" style={{textAlign: 'center', marginBottom: '3rem'}}>Enterprise-Grade Transparency</h2>
        <div className="features-grid">
          <div className="feature-block card fade-up">
            <Award size={40} className="text-saffron" />
            <h3>Verified Supply Chain</h3>
            <p>From the donor's kitchen to the beneficiary's plate, every meal is meticulously tracked on our immutable ledger ledger ensuring 100% transparency.</p>
          </div>
          <div className="feature-block card fade-up stagger-1">
            <Globe size={40} className="text-green" />
            <h3>Nation-wide Coverage</h3>
            <p>Scaled across 450+ districts with localized routing matching language, dietary preferences, and demographic requirements.</p>
          </div>
          <div className="feature-block card fade-up stagger-2">
            <ShieldCheck size={40} className="text-saffron" />
            <h3>Quality Assured</h3>
            <p>Stringent thermal and hygiene quality checks handled explicitly by certified NGO hubs before dispatch to the beneficiary.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title fade-up" style={{textAlign: 'center', marginBottom: '3rem'}}>Voices of Impact</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card card fade-up">
              <Quote size={32} opacity={0.2} style={{ marginBottom: '1rem' }} />
              <p className="quote-text">"As a catering business, we used to throw away 20kg of premium surplus every week. ANNADATA Connect picks it up seamlessly in 15 minutes."</p>
              <div className="quote-author">
                <strong>Praveen S.</strong>
                <span>Taj Hospitality Network</span>
              </div>
            </div>
            <div className="testimonial-card card fade-up stagger-1">
              <Quote size={32} opacity={0.2} style={{ marginBottom: '1rem' }} />
              <p className="quote-text">"The ONORC portability mapping allows migrant workers to access their lawful food rights without getting blocked by regional gatekeeping."</p>
              <div className="quote-author">
                <strong>Umeed Trust</strong>
                <span>Verified NGO Partner</span>
              </div>
            </div>
            <div className="testimonial-card card fade-up stagger-2">
              <Quote size={32} opacity={0.2} style={{ marginBottom: '1rem' }} />
              <p className="quote-text">"Delivering surplus food on my way back from college not only earns me fuel points but gives me immense psychological satisfaction."</p>
              <div className="quote-author">
                <strong>Ananya M.</strong>
                <span>Platinum Tier Volunteer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section container">
        <h2 className="section-title fade-up" style={{textAlign: 'center', marginBottom: '3rem'}}>Frequently Asked Questions</h2>
        <div className="faq-grid fade-up">
          <div className="faq-item card">
            <h4>What happens if the food goes bad during transit?</h4>
            <p>Our AI exclusively routes highly perishables within a 3km radius (Under 15 mins ETA). NGOs perform strict thermal audits upon receiving.</p>
          </div>
          <div className="faq-item card">
            <h4>How do you verify beneficiaries?</h4>
            <p>We integrate securely with Aadhaar-linked digital identity databases to prevent "ghost" inclusions and ensure absolute subsidy integrity.</p>
          </div>
          <div className="faq-item card">
            <h4>Is my donation eligible for 80G tax exemption?</h4>
            <p>Yes. Upon successful distribution, an immutable CSR/80G receipt is automatically generated inside your Donor Dashboard for financial compliance.</p>
          </div>
          <div className="faq-item card">
            <h4>Can I volunteer without a vehicle?</h4>
            <p>Yes! We have an "On-Foot" hyperlocal delivery mode for tasks under 1km radius, perfect for community volunteering.</p>
          </div>
        </div>
      </section>

      <section className="final-cta-section container fade-up">
        <div className="cta-banner card text-center">
          <h2>Be the Bridge to Zero Hunger</h2>
          <p>Join India's most advanced digital food distribution network today.</p>
          <div className="cta-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn-primary btn-large" onClick={() => openAuthModal('signup')}>Create Free Account</button>
            <button className="btn-outline btn-large">View Our Open Source Spec</button>
          </div>
          <div className="trust-badges" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center', opacity: 0.6, fontSize: '14px' }}>
            <span style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><CheckCircle size={16}/> ISO 27001 Certified</span>
            <span style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><CheckCircle size={16}/> Govt of India Audited</span>
          </div>
        </div>
      </section>

      <section className="audience-section container">
        <h2 className="section-title fade-up" style={{textAlign: 'center', marginBottom: '1rem'}}>Access Your Terminal</h2>
        <p className="section-subtitle text-dim" style={{textAlign: 'center', marginBottom: '3rem'}}>Dignified, secure, and authenticated access nodes for all stakeholders.</p>
        <div className="audience-grid">
          <div className="audience-card card glass fade-up stagger-1 clickable" onClick={() => handleAction('/donor', 'donor')}>
            <div className="card-icon neon-saffron"><Recycle size={32} /></div>
            <h3 className="text-gradient-saffron">Bulk Donor</h3>
            <p>Hotels & Corporations connecting surplus with 80G benefits.</p>
          </div>
          <div className="audience-card card glass fade-up stagger-2 clickable" onClick={() => handleAction('/ngo', 'ngo')}>
            <div className="card-icon neon-green"><ShieldCheck size={32} /></div>
            <h3 className="text-gradient-green">NGO Partner</h3>
            <p>Authorized distribution nodes for verified regional clusters.</p>
          </div>
          <div className="audience-card card glass fade-up stagger-3 clickable" onClick={() => handleAction('/volunteer', 'volunteer')}>
            <div className="card-icon neon-blue"><Users size={32} /></div>
            <h3 className="text-gradient-blue">Volunteer</h3>
            <p>Smart last-mile vectors moving food with crypto-verification.</p>
          </div>
          <div className="audience-card card glass fade-up stagger-3 clickable" onClick={() => handleAction('/government', 'government')}>
            <div className="card-icon neon-urgent"><Map size={32} /></div>
            <h3 style={{ color: 'var(--urgent)' }}>District Admin</h3>
            <p>Cross-district leakage termination & macro-resource mapping.</p>
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

