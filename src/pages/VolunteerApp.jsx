import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Home, 
  Layers, 
  ClipboardList, 
  User,
  Star,
  Award,
  ArrowRight,
  Users,
  ShieldAlert,
  MessageSquare,
  TrendingUp,
  Droplets
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
import './VolunteerApp.css';

const VolunteerApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [status, setStatus] = useState('idle'); 
  const [offlineMode, setOfflineMode] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  
  const { volunteers, deliveries, completeTask } = useStore();
  const myData = volunteers.find(v => v.id === 'V1') || volunteers[0];
  const myActiveTask = deliveries.find(d => d.volunteerName === myData.name) || (status !== 'idle' ? deliveries[0] : null);
  const [localPoints, setLocalPoints] = useState(myData.points);

  const handleAction = () => {
    if (status === 'assigned') setStatus('picked_up');
    else if (status === 'picked_up') {
      setCameraOpen(true);
    }
  };

  const handlePhotoUpload = () => {
    setPhotoTaken(true);
    setTimeout(() => {
      setCameraOpen(false);
      completeTask(myActiveTask.id, myData.id);
      setStatus('delivered');
      setLocalPoints(prev => prev + 50);
    }, 1500);
  };

  return (
    <div className="volunteer-app-container fade-up">
      <div className="mobile-view">
        <header className="volunteer-header" style={{ borderBottom: offlineMode ? '2px solid #f59e0b' : '1px solid var(--border-light)', background: offlineMode ? 'rgba(245, 158, 11, 0.05)' : '' }}>
          <div className="user-info">
            <div className="avatar">{myData.name.split(' ').map(n=>n[0]).join('')}</div>
            <div className="meta">
              <h3>{myData.name}</h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div className="rating">
                  {[1,2,3,4].map(i => <Star key={i} size={12} fill="var(--saffron-500)" stroke="none" />)}
                  <Star size={12} fill="rgba(0,0,0,0.1)" stroke="none" />
                  <span>{myData.rating}</span>
                </div>
                {/* Secure Offline Mode Sync Mockup */}
                <button onClick={() => setOfflineMode(!offlineMode)} style={{ background: 'transparent', border: '1px solid ' + (offlineMode ? '#f59e0b' : 'var(--border-light)'), color: offlineMode ? '#f59e0b' : 'white', fontSize: 10, padding: '2px 6px', borderRadius: 4, cursor: 'pointer' }}>
                  {offlineMode ? 'OFFLINE VAULT' : 'NETWORK SYNC'}
                </button>
              </div>
            </div>
          </div>
          {/* Karma / Impact Gamification Coin Wallet */}
          <div className="points-badge" style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', transform: status==='delivered' ? 'scale(1.15) translateY(2px)' : 'scale(1)', boxShadow: status==='delivered' ? '0 0 20px rgba(251,191,36,0.6)' : 'none', border: status==='delivered' ? '1px solid #fbbf24' : 'none' }}>
            <Award size={16} color={status==='delivered'?'#fbbf24':'currentColor'} />
            <span style={{ color: status==='delivered'?'#fbbf24':'currentColor' }}>{localPoints} pts</span>
          </div>
        </header>

        <main className="volunteer-main">
          <RoleHero 
            title="Volunteer Pipeline" 
            subtitle="The last-mile bridge moving food from hub to beneficiary." 
            icon={<Users size={32} />} 
          />
          {activeTab === 'home' && (
            <>
              {/* Smart Proof of Delivery Verification View */}
              {cameraOpen ? (
                <div className="camera-view card fade-up" style={{ textAlign: 'center', padding: '2rem' }}>
                   <h3>Neural Proof of Delivery</h3>
                   <p style={{ opacity: 0.8 }}>Point your lens at the receiving agent or drop point to verify geographical and biological handoff.</p>
                   <div style={{ width: '100%', height: 250, background: photoTaken ? 'rgba(34, 197, 94, 0.1)' : 'rgba(0,0,0,0.5)', border: `2px dashed ${photoTaken ? '#22c55e' : 'var(--saffron-500)'}`, margin: '2rem 0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease' }}>
                      {photoTaken ? (
                         <div className="fade-up" style={{ color: '#22c55e', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                           <CheckCircle size={32} /> 99.4% Biometric Target Match
                         </div>
                      ) : <span style={{ fontFamily: 'monospace', opacity: 0.5 }}>awaiting physical signature protocol...</span>}
                   </div>
                   <button className="btn-primary full-width" onClick={handlePhotoUpload} disabled={photoTaken}>
                     {photoTaken ? 'Encrypting Blockchain Receipt...' : 'Capture Cryptographic Proof'}
                   </button>
                </div>
              ) : status === 'idle' ? (
                <div className="idle-view">
                  <div className="status-banner card">
                    <h4>You are {offlineMode ? <span style={{color:'#f59e0b'}}>Offline (Cached)</span> : 'Online (Synced)'}</h4>
                    <p>Scraping hyper-local radius for active vector requests...</p>
                  </div>
                  <button className="btn-primary full-width" onClick={() => setStatus('assigned')}>
                    Intercept Nearest Route
                  </button>
                </div>
              ) : status === 'delivered' ? (
                <div className="success-view card fade-up" style={{ textAlign: 'center' }}>
                  <div className="success-icon" style={{ background: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e', color: '#22c55e', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: 32 }}>✓</div>
                  <h2>Vector Resolved!</h2>
                  <p>Smart Contract fulfilled. <strong>50 Impact Coins</strong> successfully deposited to your wallet ledger.</p>
                  <button className="btn-outline full-width" style={{ marginTop: '1rem' }} onClick={() => setStatus('idle')}>Go Offline</button>
                </div>
              ) : myActiveTask && (
                <section className="active-task card fade-up">
                  <div className="task-header">
                    <span className="task-id">TASK #{myActiveTask.id}</span>
                    <span className={`status-tag ${status}`}>{status.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="location-flow">
                    <div className="loc-item">
                      <div className="dot start"></div>
                      <div className="info">
                        <label>Pickup</label>
                        <strong>{myActiveTask.task.split(' ')[0]} {myActiveTask.task.split(' ')[1]}</strong>
                      </div>
                    </div>
                    <div className="line"></div>
                    <div className="loc-item">
                      <div className="dot end"></div>
                      <div className="info">
                        <label>Deliver To</label>
                        <strong>{myActiveTask.dest}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="task-actions">
                    {/* Mock Hyper-Local Route Sync Overlay */}
                    <button className="btn-navigate" onClick={() => alert("Launching Secure Nav Overlay Module...")}><MapPin size={18} /> Sync Directions</button>
                    <button className="btn-primary" onClick={handleAction}>
                      {status === 'assigned' ? 'Log Pickup Scanned' : 'Initiate Smart Delivery'}
                    </button>
                  </div>
                </section>
              )}

              {/* Only show nearby targets if idle and not opening camera */}
              {status === 'idle' && !cameraOpen && (
                <section className="nearby-section">
                  <div className="section-header">
                    <h3>Available Vectors (&lt; 2km radius)</h3>
                  </div>
                  <div className="task-list">
                    <div className="task-item card">
                      <div className="t-info">
                        <strong>45 Servings Hot Batch</strong>
                        <span style={{ fontSize: '13px', opacity: 0.8 }}>Hotel Plaza • 0.8km</span>
                      </div>
                      <div className="t-reward">
                        <span className="pts font-mono text-saffron">+25 Coins</span>
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          {activeTab === 'tasks' && (
            <div className="tasks-view fade-up">
              <section className="card" style={{ marginBottom: '1rem' }}>
                <div className="section-header">
                  <h3><Award size={20} style={{marginRight: '8px'}}/> Training & Badges</h3>
                </div>
                <p>Complete hygiene training module to unlock bulk deliveries (&gt;20kg).</p>
                <div style={{ background: 'rgba(255,255,255,0.1)', height: 8, borderRadius: 4, margin: '1rem 0' }}><div style={{ width: '60%', background: 'var(--saffron-500)', height: '100%' }}></div></div>
                <button className="btn-primary full-width">Resume Training (60%)</button>
              </section>

              <section className="card">
                <div className="section-header">
                  <h3><Droplets size={20} style={{marginRight: '8px'}}/> Fuel Reimbursement claims</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                  <div><strong>March Week 3</strong><br/><span style={{opacity:0.6}}>24km driven</span></div>
                  <strong className="text-green">₹180 Approved</strong>
                </div>
                <button className="btn-outline full-width" style={{ marginTop: '1rem' }}>Submit New Claim</button>
              </section>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="logs-view fade-up">
              <section className="card">
                <div className="section-header">
                  <h3><TrendingUp size={20} style={{marginRight: '8px'}}/> Data Analyst: Your Performance</h3>
                </div>
                <p>Check your delivery volume over the last 4 weeks.</p>
                <div style={{ height: 200, marginTop: '1rem' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[ {w: 'W1', d: 12}, {w: 'W2', d: 18}, {w: 'W3', d: 15}, {w: 'W4', d: 24} ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis dataKey="w" />
                      <RechartsTooltip />
                      <Line type="step" dataKey="d" stroke="var(--saffron-500)" strokeWidth={3} name="Deliveries" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 8, textAlign: 'center' }}><h4>Total</h4><h2 className="text-saffron">69</h2></div>
                  <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 8, textAlign: 'center' }}><h4>Points</h4><h2 className="text-green">1,450</h2></div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'me' && (
            <div className="me-view fade-up">
              <section className="card" style={{ marginBottom: '1rem', borderTop: '4px solid #ef4444', animation: sosActive ? 'pulse 1.5s infinite' : 'none', background: sosActive ? 'rgba(239, 68, 68, 0.05)' : '' }}>
                <div className="section-header">
                  <h3 style={{ color: '#ef4444' }}><ShieldAlert size={20} style={{marginRight: '8px'}}/> One-Tap SOS & Hostility Broadcaster</h3>
                </div>
                {sosActive ? (
                   <div style={{ color: '#ef4444', textAlign: 'center', padding: '1rem' }}>
                      <ShieldAlert size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
                      <strong className="font-mono">LIVE GPS & MIC SIGNAL BROADCASTED SECURELY TO ADMIN NODES</strong>
                      <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>Do not close this application. Assistance dropping to your coordinates.</p>
                   </div>
                ) : (
                   <>
                     <p style={{ opacity: 0.8 }}>Facing issues during physical dropoff? Accident, spoilage, or hostile entity?</p>
                     <button className="btn-primary full-width" style={{ background: '#ef4444', borderColor: '#ef4444', marginTop: '1rem' }} onClick={() => setSosActive(true)}>
                       Trigger Silent Alarm & Drop Coordinates
                     </button>
                   </>
                )}
              </section>

              <section className="card">
                <div className="section-header">
                  <h3><MessageSquare size={20} style={{marginRight: '8px'}}/> Community Forum</h3>
                </div>
                <p>Connect with other Food Bridge Volunteers in Bengaluru.</p>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 8, marginTop: '1rem' }}>
                  <strong>Raj K:</strong> "Traffic near Sony World signal is blocked, take 100ft road."
                </div>
                <button className="btn-outline full-width" style={{ marginTop: '1rem' }}>Join Chat</button>
              </section>
            </div>
          )}
        </main>

        <nav className="mobile-nav">
          <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}><Home size={20} /><span>Home</span></button>
          <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}><Layers size={20} /><span>Tasks</span></button>
          <button className={activeTab === 'logs' ? 'active' : ''} onClick={() => setActiveTab('logs')}><ClipboardList size={20} /><span>Logs</span></button>
          <button className={activeTab === 'me' ? 'active' : ''} onClick={() => setActiveTab('me')}><User size={20} /><span>Me</span></button>
        </nav>
      </div>
    </div>
  );
};

export default VolunteerApp;
