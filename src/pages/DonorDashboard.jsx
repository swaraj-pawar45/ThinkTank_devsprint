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
  Info,
  TrendingUp,
  FileText,
  Trophy,
  Repeat,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import RoleHero from '../components/shared/RoleHero';
import { useStore } from '../store/useStore';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiMatch, setAiMatch] = useState(null);
  const [formData, setFormData] = useState({ type: 'cooked', qty: '50', unit: 'Servings', isUrgent: false });

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
      status: formData.isUrgent ? 'Critical' : 'New'
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
          <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
            <TrendingUp size={20} /> Data Analyst
          </button>
          <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
            <History size={20} /> My Donations
          </button>
          <button className={activeTab === 'tax' ? 'active' : ''} onClick={() => setActiveTab('tax')}>
            <FileText size={20} /> Tax Exemption (80G)
          </button>
          <button className={activeTab === 'leaderboard' ? 'active' : ''} onClick={() => setActiveTab('leaderboard')}>
            <Trophy size={20} /> Leaderboard
          </button>
          <button className={activeTab === 'subscriptions' ? 'active' : ''} onClick={() => setActiveTab('subscriptions')}>
            <Repeat size={20} /> Smart Subscriptions
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <RoleHero 
          title="Donor Dashboard" 
          subtitle="AI will match your surplus with the nearest verified NGO for bridge distribution." 
          icon={<LayoutDashboard size={32} />} 
        />
        {activeTab === 'post' && (
          <div className="post-surplus-view fade-up">

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

                {/* 1-Click Urgent Tag */}
                <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <input 
                    type="checkbox" 
                    id="urgentBox" 
                    checked={formData.isUrgent}
                    onChange={(e) => setFormData({...formData, isUrgent: e.target.checked})}
                    style={{ width: '20px', height: '20px', accentColor: '#ef4444' }}
                  />
                  <label htmlFor="urgentBox" style={{ fontWeight: '600', color: '#ef4444', margin: 0, cursor: 'pointer' }}>
                    Urgent / Highly Perishable
                  </label>
                  <span style={{ fontSize: '12px', opacity: 0.8, marginLeft: 'auto' }}>
                    Triggers 3km Sprint AI Routing
                  </span>
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
            <h2>Recent Impact logs</h2>
            <div className="history-list">
              <div className="history-item card">
                <strong>45 Cooked Meals</strong>
                <span>Umeed Trust • Successfully Delivered</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-view fade-up">
            <h2>Granular ESG Data Analyst</h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Measure exactly how your diverted landfill tonnage translates into measurable CO2 emission savings and ESG impact.</p>
            <div className="chart-container card" style={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { month: 'Jan', foodDiverted: 120, co2Saved: 50 },
                  { month: 'Feb', foodDiverted: 250, co2Saved: 120 },
                  { month: 'Mar', foodDiverted: 300, co2Saved: 150 },
                  { month: 'Apr', foodDiverted: 450, co2Saved: 210 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'var(--sand-100)', border: 'none', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="foodDiverted" stroke="var(--saffron-500)" strokeWidth={4} name="Landfill Diverted (kg)" />
                  <Line type="monotone" dataKey="co2Saved" stroke="#10b981" strokeWidth={4} name="CO2 Saved (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
              <div className="card"><h4>Total Food Saved</h4><h2 className="text-saffron font-mono">1,120 kg</h2></div>
              <div className="card"><h4>Methane Prevention</h4><h2 className="text-green font-mono">530 kg</h2></div>
              <div className="card"><h4>ESG Rating Boost</h4><h2 className="font-mono" style={{color: '#3b82f6'}}>+14 Pts</h2></div>
            </div>
          </div>
        )}

        {activeTab === 'tax' && (
          <div className="tax-view fade-up card" style={{ padding: '2rem' }}>
            <h2>Auto-Generated CSR / 80G Vault</h2>
            <p style={{ opacity: 0.8 }}>Immutable blockchain-verified PDF receipts automatically generated for corporate tax filings.</p>
            
            <div className="certificate-list" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div className="vault-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem' }}>FY 2025-2026 Quarter 1</strong><br/>
                  <span style={{opacity:0.8, color: 'var(--green-500)'}}>₹1.2L Insured Value Donated</span>
                  <div className="font-mono" style={{ fontSize: '12px', marginTop: '8px', opacity: 0.5 }}>
                    TX Hash: 0x8f2d...49a1 <CheckCircle2 size={12} style={{display:'inline'}} color="green"/> Verified Ledger
                  </div>
                </div>
                <button className="btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center'}}><Download size={16} /> Get 80G PDF</button>
              </div>

              <div className="vault-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem' }}>FY 2024-2025 Annual Block</strong><br/>
                  <span style={{opacity:0.8, color: 'var(--green-500)'}}>₹4.8L Insured Value Donated</span>
                  <div className="font-mono" style={{ fontSize: '12px', marginTop: '8px', opacity: 0.5 }}>
                    TX Hash: 0x3a1c...99b2 <CheckCircle2 size={12} style={{display:'inline'}} color="green"/> Verified Ledger
                  </div>
                </div>
                <button className="btn-outline" style={{ display: 'flex', gap: '8px', alignItems: 'center'}}><Download size={16} /> Get 80G PDF</button>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard-view fade-up card" style={{ padding: '2rem' }}>
            <h2>Gamified Local Leaderboards</h2>
            <p style={{ opacity: 0.8 }}>Benchmarking your absolute contribution against other Top Tier Hospitality Donors in Indiranagar Ward.</p>
            <div className="ranks" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Trophy size={24} color="#fbbf24" /> 1. ITC Gardenia
                </span>
                <span className="font-mono" style={{ fontSize: '1.2rem', color: '#fbbf24' }}>12,450 Meals</span>
              </div>
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.3)' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Trophy size={24} color="#94a3b8" /> 2. Taj Vivanta
                </span>
                <span className="font-mono" style={{ fontSize: '1.2rem', color: '#94a3b8' }}>9,200 Meals</span>
              </div>
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', border: '1px solid var(--saffron-500)' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{width: 24, textAlign: 'center'}}>3.</span> John's Kitchen (You)
                </span>
                <span className="font-mono" style={{ fontSize: '1.2rem', color: 'var(--saffron-500)' }}>1,120 Meals</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="subscriptions-view fade-up card" style={{ padding: '2rem' }}>
            <h2>Predictive Smart Scheduling</h2>
            <p style={{ opacity: 0.8 }}>Automate logistics and volunteer dispatch for predictable, recurring surpluses without daily manual entry.</p>
            
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid var(--green-500)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>Friday Night Bakery Clear-out</strong>
                  <p style={{ opacity: 0.8, margin: '8px 0 0 0' }}>Every Friday at 11:30 PM • ~45 kg Assorted Breads</p>
                </div>
                <div><span className="badge" style={{ background: 'var(--green-500)', color: 'white', padding: '6px 12px', borderRadius: '12px' }}>Active Sprint</span></div>
              </div>
              
              <button className="btn-primary" style={{ marginTop: '1rem', alignSelf: 'flex-start', display: 'flex', gap: '8px' }}>
                <PlusCircle size={18} /> Plan New Recurring Run
              </button>
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
