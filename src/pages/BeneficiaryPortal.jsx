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
  Shield
} from 'lucide-react';
import './BeneficiaryPortal.css';

const BeneficiaryPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showOtp, setShowOtp] = useState(false);
  const [bookingStep, setBookingStep] = useState(0); // 0: Browse, 1: Select Time, 2: Confirm, 3: Success

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

  const pickups = [
    { id: 1, location: 'Fair Price Shop #2847', food: '10kg Rice, 2kg Dal', time: 'Tomorrow, 10:00 AM - 01:00 PM', status: 'confirmed' },
    { id: 2, location: 'Umeed Trust Center', food: 'Cooked Lunch (Rajma Chawal)', time: 'Today, 01:30 PM', status: 'pending' }
  ];

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
      <header className="portal-header">
        <div className="welcome">
          <span>Namaste,</span>
          <h2>Your Food Schedule</h2>
        </div>
        <div className="lang-mini">हि / EN</div>
      </header>

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
              <button className="btn-secondary">
                <QrCode size={18} /> View QR Code
              </button>
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
            <button className="btn-primary" onClick={() => setBookingStep(0)}>Save to My Schedule</button>
            <button className="btn-text">Download Receipt</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryPortal;
