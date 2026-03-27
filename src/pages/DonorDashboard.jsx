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
import { useStore } from '../store/useStore';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiMatch, setAiMatch] = useState(null);
  const [formData, setFormData] = useState({ type: 'cooked', qty: '50', unit: 'Servings' });

  const { addFoodSurplus } = useStore();

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setAiMatch({
        ngoCount: 3,
        distance: '1.2km',
        eta: '15 mins',
        trustScore: '98%'
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleConfirmMatch = () => {
    addFoodSurplus({
      donorName: "John's Kitchen",
      type: formData.type === 'cooked' ? 'Cooked Meals' : 'Raw Grains',
      qty: `${formData.qty} ${formData.unit}`,
      dist: aiMatch.distance,
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAiMatch(null);
      setActiveTab('history');
    }, 2000);
  };

  return (
    <div className="dashboard-container">
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
          <button className={activeTab === 'post' ? 'active' : ''} onClick={() => setActiveTab('post')}>
            <PlusCircle size={20} /> Post Surplus
          </button>
          <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
            <History size={20} /> My Donations
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        {activeTab === 'post' && (
          <div className="post-surplus-view fade-up">
            <header className="view-header">
              <h1>Post Surplus Food</h1>
              <p>AI will match you with the nearest verified NGO for bridge distribution.</p>
            </header>

            <div className="post-grid">
              <form className="post-form card" onSubmit={handlePostSubmit}>
                <div className="form-section">
                  <label>Food Category</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="cooked">Cooked Meals</option>
                    <option value="grains">Raw Grains</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-section">
                    <label>Quantity</label>
                    <div className="quantity-input">
                      <input type="number" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} />
                      <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                        <option>Servings</option>
                        <option>Kg</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'AI Matching...' : 'Connect Surplus →'}
                </button>
              </form>

              <aside className="ai-preview-panel">
                {aiMatch ? (
                  <div className="ai-match-card card fade-up">
                    <div className="ai-badge">AI MATCH ACTIVE</div>
                    <h3>{aiMatch.ngoCount} Local NGOs Waiting</h3>
                    <div className="match-stats">
                      <div className="m-stat">
                        <span className="val">{aiMatch.distance}</span>
                        <span className="lab">Avg. Range</span>
                      </div>
                      <div className="m-stat">
                        <span className="val">{aiMatch.eta}</span>
                        <span className="lab">Pickup ETA</span>
                      </div>
                    </div>
                    <button className="btn-primary" onClick={handleConfirmMatch}>Accept & Broadcast</button>
                  </div>
                ) : (
                  <div className="ai-wait-card card">
                    <Info size={32} opacity={0.3} />
                    <h3>Automated Routing</h3>
                    <p>Enter details to see real-time NGO capacity in Indiranagar Area.</p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-view fade-up">
            <h1>Recent Impact logs</h1>
            <div className="history-list">
              <div className="history-item card">
                <strong>45 Cooked Meals</strong>
                <span>Umeed Trust • Successfully Delivered</span>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-overlay fade-up">
            <div className="success-content card">
              <div className="check-icon">✓</div>
              <h2>Broadcast Sent!</h2>
              <p>NGOs in your area have been notified. Check 'My Donations' for tracking.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DonorDashboard;
