import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  BarChart3, 
  FileCheck, 
  Settings,
  MapPin,
  Clock,
  Camera,
  CheckCircle2,
  Info
} from 'lucide-react';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock AI Matching Result (Layer 3.2 specification)
  const [aiMatch, setAiMatch] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate AI matching (Layer 3.1 & 3.2)
    setTimeout(() => {
      setAiMatch({
        ngoCount: 3,
        distance: '4.2km',
        eta: '45 mins',
        trustScore: '98%'
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleConfirmMatch = () => {
    setShowSuccess(true);
    // Simulate confetti burst or transition
    setTimeout(() => {
      setShowSuccess(false);
      setAiMatch(null);
      // Reset form or move to History
    }, 3000);
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR (Layer 2.2.2) */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="donor-profile">
            <div className="avatar">JS</div>
            <div className="profile-info">
              <span className="name">John's Kitchen</span>
              <span className="role">Bulk Donor</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            className={activeTab === 'post' ? 'active' : ''} 
            onClick={() => setActiveTab('post')}
          >
            <PlusCircle size={20} /> Post Surplus
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''} 
            onClick={() => setActiveTab('history')}
          >
            <History size={20} /> My Donations
          </button>
          <button 
            className={activeTab === 'impact' ? 'active' : ''} 
            onClick={() => setActiveTab('impact')}
          >
            <BarChart3 size={20} /> Impact Report
          </button>
          <button 
            className={activeTab === 'csr' ? 'active' : ''} 
            onClick={() => setActiveTab('csr')}
          >
            <FileCheck size={20} /> CSR Certificate
          </button>
          <hr />
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} /> Settings
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        {activeTab === 'post' && (
          <div className="post-surplus-view fade-up">
            <header className="view-header">
              <h1>Post Surplus Food</h1>
              <p>Your surplus can bridge a gap today. AI will match you with the nearest verified NGO.</p>
            </header>

            <div className="post-grid">
              <form className="post-form card" onSubmit={handlePostSubmit}>
                <div className="form-section">
                  <label>What are you donating?</label>
                  <select required>
                    <option value="">Select food type</option>
                    <option value="cooked">Cooked Meals (Dal, Rice, Roti)</option>
                    <option value="grains">Raw Grains / Pulses</option>
                    <option value="produce">Fresh Produce (Vegetables/Fruit)</option>
                    <option value="packaged">Packaged/Canned Food</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-section">
                    <label>Quantity</label>
                    <div className="quantity-input">
                      <input type="number" placeholder="50" required />
                      <select className="unit-toggle">
                        <option>Servings</option>
                        <option>Kg</option>
                        <option>Packets</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-section">
                    <label>Available From</label>
                    <div className="input-with-icon">
                      <Clock size={16} />
                      <input type="time" required />
                    </div>
                  </div>
                  <div className="form-section">
                    <label>Expires By</label>
                    <div className="input-with-icon">
                      <Clock size={16} />
                      <input type="time" required />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <label>Pickup Location</label>
                  <div className="input-with-icon">
                    <MapPin size={16} />
                    <input type="text" placeholder="Detecting location..." value="Indiranagar, Bengaluru" readOnly />
                  </div>
                </div>

                <div className="form-section">
                  <label>Dietary Tags</label>
                  <div className="tag-chips">
                    <span className="chip active">Veg</span>
                    <span className="chip">Jain</span>
                    <span className="chip">Halal</span>
                    <span className="chip">Gluten-free</span>
                  </div>
                </div>

                <div className="form-section">
                  <label>Additional Notes</label>
                  <textarea placeholder="e.g. Please bring large containers for Dal. Items are fresh from lunch service."></textarea>
                </div>

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'AI Matching...' : 'Connect My Surplus →'}
                </button>
              </form>

              <aside className="ai-preview-panel">
                {aiMatch ? (
                  <div className="ai-match-card card fade-up">
                    <div className="ai-badge">AI MATCH ACTIVE</div>
                    <h3>We found {aiMatch.ngoCount} verified matches!</h3>
                    <div className="match-stats">
                      <div className="m-stat">
                        <span className="val">{aiMatch.distance}</span>
                        <span className="lab">Avg. Distance</span>
                      </div>
                      <div className="m-stat">
                        <span className="val">{aiMatch.eta}</span>
                        <span className="lab">Est. Pickup</span>
                      </div>
                    </div>
                    <p className="match-desc">
                      <CheckCircle2 size={16} color="var(--green-500)" />
                      <strong>Aastha Foundation</strong> is available and has 12 volunteers nearby.
                    </p>
                    <button className="btn-primary" onClick={handleConfirmMatch}>Confirm & Notify NGOs</button>
                  </div>
                ) : (
                  <div className="ai-wait-card card">
                    <Info size={32} opacity={0.3} />
                    <h3>AI Matching Intelligence</h3>
                    <p>Fill out the form to see real-time matches from our network of 4,200+ verified NGOs.</p>
                  </div>
                )}

                {showSuccess && (
                  <div className="success-overlay fade-up">
                    <div className="success-content card">
                      <div className="check-icon">✓</div>
                      <h2>Request Broadcasted!</h2>
                      <p>Aastha Foundation has accepted your request. Volunteer "Rahul" is 12 mins away.</p>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}

        {activeTab !== 'post' && (
          <div className="placeholder-view">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h2>
            <p>This module is under development as per Layer 2.2 structure.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DonorDashboard;
