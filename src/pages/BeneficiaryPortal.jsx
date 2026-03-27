import React, { useState } from 'react';
import { 
  QrCode, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  ChevronRight, 
  CheckCircle,
  HelpCircle,
  Shield,
  User,
  Activity,
  Users,
  CreditCard,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import RoleHero from '../components/shared/RoleHero';
import './BeneficiaryPortal.css';

const BeneficiaryPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showOtp, setShowOtp] = useState(false);
  const [bookingStep, setBookingStep] = useState(0); // 0: Browse, 1: Select Time, 2: Confirm, 3: Success
  const [family, setFamily] = useState([
    { id: 'f1', name: 'Anita K. (Wife)', verified: true },
    { id: 'f2', name: 'Rohan K. (Son)', verified: true }
  ]);
  const [issueReported, setIssueReported] = useState(false);
  const [campRegistered, setCampRegistered] = useState(false);
  const [portabilityState, setPortabilityState] = useState('KA-Bengaluru');
  const [activeQr, setActiveQr] = useState(null);
  const [pickups, setPickups] = useState([
    { id: 1, location: 'Fair Price Shop #2847', food: '10kg Rice, 2kg Dal', time: 'Tomorrow, 10:00 AM - 01:00 PM', status: 'confirmed' },
    { id: 2, location: 'Umeed Trust Center', food: 'Cooked Lunch (Rajma Chawal)', time: 'Today, 01:30 PM', status: 'pending' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

/* Static pickups removed */

  if (!isLoggedIn) {
    return (
      <div className="portal-login-view fade-up">
        <div className="login-card card">
          <div className="minister-seal">
            <Shield size={24} color="var(--green-600)" />
          </div>
          <h1>Access Your Food Portal</h1>
          <p>Login with your Aadhaar-linked mobile number for dignified food access.</p>
          
          <form onSubmit={handleLogin} className="login-form">
            {!showOtp ? (
              <div className="login-input-group">
                <div className="input-with-label">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter 10 digit number" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    required 
                  />
                </div>
                <button type="submit" className="btn-primary">Send OTP →</button>
              </div>
            ) : (
              <div className="otp-input-group">
                <label>Enter 4-Digit OTP</label>
                <div className="otp-boxes">
                  {otp.map((digit, idx) => (
                    <input 
                      key={idx}
                      id={`otp-${idx}`}
                      type="text" 
                      maxLength={1} 
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                    />
                  ))}
                </div>
                <button type="submit" className="btn-primary">Verify & Login</button>
                <button type="button" className="btn-text" onClick={() => setShowOtp(false)}>Change Number</button>
              </div>
            )}
          </form>

          <footer className="login-footer">
            <div className="ivr-info">
              <Phone size={16} />
              <span>No smartphone? Call <strong>1800-444-0000</strong> (Toll Free)</span>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="beneficiary-dashboard container fade-up">
      <RoleHero 
        title="Your Food Schedule" 
        subtitle="Namaste! Here is your schedule for dignified food access." 
        icon={<User size={32} />} 
        rightContent={<div className="lang-mini" style={{background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '20px', backdropFilter: 'blur(10px)'}}>हि / EN</div>}
      />

      <section className="upcoming-section">
        <h3>Upcoming Pickups</h3>
        <div className="pickup-grid">
          {pickups.map(item => (
            <div key={item.id} className="pickup-card card">
              <div className="p-badge">{item.status}</div>
              <div className="p-header">
                <MapPin size={18} />
                <h4>{item.location}</h4>
              </div>
              <div className="p-details">
                <div className="p-info">
                  <div className="lab">Food Items</div>
                  <div className="val">{item.food}</div>
                </div>
                <div className="p-info">
                  <div className="lab">Scheduled Time</div>
                  <div className="val">{item.time}</div>
                </div>
              </div>
              <button className="btn-secondary" onClick={() => setActiveQr(activeQr === item.id ? null : item.id)}>
                <QrCode size={18} /> {activeQr === item.id ? 'Close Details' : 'View QR Code'}
              </button>
              
              {activeQr === item.id && (
                 <div className="fade-up" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center', borderTop: '1px solid var(--border-light)' }}>
                    <QrCode size={120} style={{ margin: '0 auto', opacity: 0.8 }} color="var(--saffron-500)" />
                    <p className="font-mono" style={{ marginTop: '1rem', letterSpacing: '2px', color: 'var(--saffron-500)', fontSize: '1.2rem', fontWeight: 'bold' }}>ANNA-{item.id}X99-BLR</p>
                    <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>Scan this cryptographic code at the distribution counter for authenticated matching.</p>
                 </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="booking-section">
        <div className="booking-cta card">
          <div className="cta-icon"><Calendar size={32} /></div>
          <div className="cta-copy">
            <h3>Need more?</h3>
            <p>Book a slot at your nearest Fair Price Shop or NGO collection point.</p>
          </div>
          <button className="btn-primary" onClick={() => setBookingStep(1)}>Book a Slot →</button>
        </div>
      </section>

      <section className="settings-section">
        <h3>Dietary Preferences</h3>
        <div className="tag-chips">
          <span className="chip active">Veg</span>
          <span className="chip">Non-Veg</span>
          <span className="chip">Jain</span>
          <span className="chip">Diabetic-friendly</span>
        </div>
      </section>

      {/* NEW FEATURES BATCH */}
      <h2 className="section-title" style={{marginTop: '3rem'}}>My Portal Hub</h2>
      
      <div className="beneficiary-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        
        {/* 1. Data Analyst (Nutrition) */}
        <section className="nutrition-analyst card">
          <div className="section-header">
            <h3><Activity size={20} style={{marginRight: '8px'}}/> Family Nutrition Tracker</h3>
          </div>
          <p style={{ opacity: 0.8 }}>Protein & Calorie intake for the last 3 months.</p>
          <div style={{ height: 200, marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[ {m: 'Jan', p: 400, c: 12000}, {m: 'Feb', p: 450, c: 14000}, {m: 'Mar', p: 600, c: 16000} ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="m" />
                <YAxis hide />
                <RechartsTooltip />
                <Bar dataKey="p" fill="var(--saffron-500)" radius={[4, 4, 0, 0]} name="Protein (g)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 2. Family Members */}
        <section className="family-management card">
          <div className="section-header">
            <h3><Users size={20} style={{marginRight: '8px'}}/> Dependent Members</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {family.map(f => (
              <li key={f.id} className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <span><strong>{f.name}</strong></span> <span className={f.verified ? 'text-green' : 'text-saffron'}>{f.verified ? 'Verified ✓' : 'Pending UIDAI Phase 2'}</span>
              </li>
            ))}
          </ul>
          <button className="btn-outline" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setFamily([...family, { id: 'f3', name: 'Neelam K. (Daughter)', verified: false }])}>+ Add Member via Aadhaar</button>
        </section>

        {/* 3. Ration Portability */}
        <section className="ration-card card">
          <div className="section-header">
            <h3><CreditCard size={20} style={{marginRight: '8px'}}/> Ration Portability (ONORC)</h3>
          </div>
          <p style={{ opacity: 0.8 }}>Relocating? Seamlessly shift your food quota to any FPS in India.</p>
          <div style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 8, marginTop: '1rem' }}>
            <strong>Current Registry Node:</strong> <span className={portabilityState.includes('Pending') ? 'text-saffron' : ''}>{portabilityState}</span>
            <br/>
            {portabilityState === 'KA-Bengaluru' ? (
               <button className="btn-text" style={{ padding: 0, marginTop: '0.8rem' }} onClick={() => setPortabilityState('MH-Mumbai (Pending Sync)')}>Migrate Location via ONORC →</button>
            ) : (
               <div style={{marginTop: '0.8rem', fontSize: '12px'}} className="text-saffron fade-up">Inter-State Central Switch Connecting...</div>
            )}
          </div>
        </section>

        {/* 4. Grievance */}
        <section className="grievance-card card">
          <div className="section-header">
            <h3><AlertTriangle size={20} style={{marginRight: '8px'}}/> Report an Issue</h3>
          </div>
          <p style={{ opacity: 0.8 }}>Did you receive poor quality food or was asked for bribes?</p>
          {issueReported ? (
             <div className="fade-up" style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: '8px', color: '#22c55e', textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}>✓ Block-chain Ticket #8911 Logged Anonymously. Node alerted.</div>
          ) : (
            <button className="btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444', marginTop: '1rem', width: '100%' }} onClick={() => setIssueReported(true)}>File an Anonymous Complaint</button>
          )}
        </section>

        {/* 5. Health Check */}
        <section className="health-card card">
          <div className="section-header">
            <h3><Heart size={20} style={{marginRight: '8px'}}/> Monthly Health Camp</h3>
          </div>
          <h2>Free Checkup</h2>
          <p style={{ opacity: 0.8 }}>Next camp: Sunday 10 AM at Ward 82 center.</p>
          {campRegistered ? (
             <div className="fade-up" style={{ padding: '0.8rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '8px', textAlign: 'center', marginTop: '1rem', fontWeight: 'bold', border: '1px solid #22c55e' }}>✓ Full Family (4) Slot Reserved</div>
          ) : (
             <button className="btn-outline" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setCampRegistered(true)}>Reserve Slots for Family</button>
          )}
        </section>
      </div>

      {bookingStep === 1 && (
        <div className="booking-modal-overlay">
          <div className="booking-modal card fade-up">
            <header>
              <h2>Select Pickup Point</h2>
              <button onClick={() => setBookingStep(0)}>✕</button>
            </header>
            <div className="point-list">
              {[1, 2, 3].map(i => (
                <div key={i} className="point-item" onClick={() => setBookingStep(2)}>
                  <div className="point-info">
                    <strong>FPS Point #{2840 + i}</strong>
                    <span>Distance: {1.2 + i * 0.5}km • Active Now</span>
                  </div>
                  <ChevronRight size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {bookingStep === 2 && (
        <div className="booking-modal-overlay">
          <div className="booking-modal card fade-up">
            <header>
              <h2>Select Time Slot</h2>
              <button onClick={() => setBookingStep(1)}>Back</button>
            </header>
            <div className="time-grid">
              {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map(time => (
                <button key={time} className="time-btn" onClick={() => setBookingStep(3)}>
                  <Clock size={16} /> {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {bookingStep === 3 && (
        <div className="booking-modal-overlay">
          <div className="booking-modal success card fade-up">
            <div className="success-icon"><CheckCircle size={48} /></div>
            <h2>Slot Confirmed!</h2>
            <p>Your pickup at FPS Point #2842 is scheduled for 02:00 PM tomorrow.</p>
            <div className="qr-box placeholder">
              <QrCode size={120} opacity={0.5} />
              <span>ANNADATA-2026-QR-0912</span>
            </div>
            <button className="btn-primary" onClick={() => {
               setPickups([{
                 id: Date.now(),
                 location: 'FPS Point #2842',
                 food: 'Standard Ration Quota (5kg)',
                 time: 'Tomorrow, 02:00 PM',
                 status: 'confirmed'
               }, ...pickups]);
               setBookingStep(0);
            }}>Save to My Schedule</button>
            <button className="btn-text">Download Receipt</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryPortal;
