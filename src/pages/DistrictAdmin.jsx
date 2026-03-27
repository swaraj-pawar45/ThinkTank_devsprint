import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Download, 
  TrendingUp, 
  AlertOctagon, 
  Users, 
  ShoppingBag,
  Info,
  ChevronDown,
  Map,
  MessageSquare,
  Wallet,
  ClipboardCheck,
  Activity
} from 'lucide-react';
import RoleHero from '../components/shared/RoleHero';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import LiveMapFilter from '../components/shared/LiveMapFilter';
import { useStore } from '../store/useStore';
import './DistrictAdmin.css';

/* Mock Heatmap Removed */

const DistrictAdmin = () => {
  const [district, setDistrict] = useState('Central Bengaluru');
  const { foodFeed, deliveries } = useStore();

  const [chartData2, setChartData2] = useState([ {zone: 'Zone A', prob: 12, fill: '#3b82f6'}, {zone: 'Zone B', prob: 45, fill: '#f59e0b'}, {zone: 'Zone C', prob: 8, fill: '#3b82f6'}, {zone: 'Zone D', prob: 60, fill: '#ef4444'} ]);
  const [isScanning, setIsScanning] = useState(false);
  const [smsStatus, setSmsStatus] = useState('idle');
  const [budgetUtil, setBudgetUtil] = useState(32);
  const [fpsList, setFpsList] = useState([
    { id: '1022', status: 'Failed', banned: false },
    { id: '2841', status: 'Passed', banned: false }
  ]);
  const [inclusionCards, setInclusionCards] = useState([
    { id: 'i1', count: 12, ward: 'Koramangala slug' }
  ]);

  const runLeakageScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setChartData2([
        {zone: 'Zone A', prob: 14, fill: '#3b82f6'}, 
        {zone: 'Zone B', prob: 41, fill: '#f59e0b'}, 
        {zone: 'Zone C', prob: 11, fill: '#3b82f6'}, 
        {zone: 'Zone D', prob: 58, fill: '#ef4444'},
        {zone: 'Zone E', prob: 94, fill: '#991b1b'} // NEW Ghost Zone Spike found by AI
      ]);
      setIsScanning(false);
    }, 1500);
  };

  const sendSMS = () => {
    setSmsStatus('sending');
    setTimeout(() => setSmsStatus('sent'), 2000);
  };

  const kpis = [
    { label: 'FPS Shops Active', value: '1,420', icon: <ShoppingBag size={20} />, status: 'normal' },
    { label: 'Ghost Beneficiaries', value: '124', icon: <Users size={20} />, status: 'warning' },
    { label: 'Food Distributed (MT)', value: '85,400', icon: <TrendingUp size={20} />, status: 'normal' },
    { label: 'Leakage Alerts', value: '18', icon: <AlertTriangle size={20} />, status: 'danger' },
    { label: 'Inclusion Requests', value: '342', icon: <Info size={20} />, status: 'normal' }
  ];

  const chartData = [
    { name: 'Jan', hunger: 45, food: 38 },
    { name: 'Feb', hunger: 42, food: 41 },
    { name: 'Mar', hunger: 38, food: 45 },
    { name: 'Apr', hunger: 35, food: 42 },
    { name: 'May', hunger: 30, food: 48 },
    { name: 'Jun', hunger: 28, food: 52 }
  ];

  return (
    <div className="admin-dashboard container-fluid fade-up">
      <RoleHero 
        title={`District Administration: ${district}`} 
        subtitle="National-level visibility on hunger-points and distribution data." 
        icon={<Map size={32} />} 
      />
      <header className="dashboard-top-bar card">
        <div className="district-selector">
          <strong>District:</strong>
          <button className="btn-select">
            {district} <ChevronDown size={16} />
          </button>
        </div>
        <div className="global-search">
          <Search size={18} />
          <input type="text" placeholder="Search Ration Cards, FPS, or NGOs..." />
        </div>
        <div className="actions">
          <button className="btn-outline"><Download size={18} /> Export Data</button>
          <div className="last-sync font-mono">LIVE: 27 MAR 2026, 09:50 AM</div>
        </div>
      </header>

      {/* ROW 1: KPI CARDS */}
      <div className="kpi-row">
        {kpis.map((kpi, i) => (
          <div key={i} className={`kpi-card card ${kpi.status}`}>
            <div className="kpi-header">
              <span className="icon">{kpi.icon}</span>
              <span className="label">{kpi.label}</span>
            </div>
            <div className="kpi-value font-mono">{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-mid-grid">
        {/* ROW 2 - LEFT: TREND CHART */}
        <section className="chart-panel card">
          <div className="section-header">
            <h3>Supply vs. Hunger Index</h3>
            <div className="legend">
              <span className="l-item hunger">Hunger Score</span>
              <span className="l-item food">Distributed Food</span>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--sand-200)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="hunger" stroke="#C0392B" fill="rgba(192, 57, 43, 0.1)" />
                <Area type="monotone" dataKey="food" stroke="var(--green-500)" fill="rgba(61, 107, 31, 0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ROW 2 - RIGHT: LIVE RADAR MAP */}
        <LiveMapFilter foodFeed={foodFeed} deliveries={deliveries} role="Admin" />
      </div>

      {/* ROW 3: ALERTS TABLE */}
      <section className="alerts-section card">
        <div className="section-header">
          <h3>Leakage & Anomaly Alerts (AI Engine)</h3>
          <span className="badge-urgent">Action Required</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>FPS Shop Code</th>
              <th>Location</th>
              <th>Anomaly Type</th>
              <th>Confidence</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="urgent-row">
              <td className="font-mono">KA-BNG-2841</td>
              <td>Indiranagar Ward 82</td>
              <td>Ghost Diversion Pattern</td>
              <td><span className="conf high">94%</span></td>
              <td><span className="pill red">Flagged</span></td>
              <td><button className="btn-primary btn-xs">Investigate</button></td>
            </tr>
            <tr>
              <td className="font-mono">KA-BNG-1022</td>
              <td>Domlur Colony</td>
              <td>Bulk Stock Mismatch</td>
              <td><span className="conf med">72%</span></td>
              <td><span className="pill green">Reviewed</span></td>
              <td><button className="btn-outline btn-xs">Details</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ROW 4: AI RECS */}
      <section className="recs-section card">
        <div className="section-header">
          <h3>Beneficiary Inclusion Recommendations</h3>
        </div>
        <div className="recs-grid">
          {inclusionCards.map(c => (
            <div key={c.id} className="rec-card">
              <AlertOctagon size={24} color="var(--saffron-500)" />
              <div className="rec-info">
                <h4>Exclusion Error Detected</h4>
                <p>{c.count} Households in {c.ward} identified for inclusion via AI predictive mapping.</p>
              </div>
              <button className="btn-primary" style={{ marginLeft: 'auto', background: 'var(--saffron-500)', borderColor: 'var(--saffron-500)', boxShadow: '0 4px 15px rgba(212, 130, 26, 0.3)' }} onClick={() => setInclusionCards([])}>
                <ClipboardCheck size={18} style={{marginRight: '8px'}}/> Approve Group Access
              </button>
            </div>
          ))}
          {inclusionCards.length === 0 && <p className="text-green fade-up" style={{display:'flex', alignItems:'center', gap:'8px', padding: '1rem'}}><CheckCircle2 size={24}/> AI Algorithm Auth-Provisioning Complete.</p>}
        </div>
      </section>

      {/* NEW FEATURES BATCH */}
      <h2 className="section-title" style={{marginTop: '3rem'}}>Advanced Administration Hub</h2>
      
      <div className="admin-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        
        {/* 1. Data Analyst (Predictive Model) */}
        <section className="analyst-view card">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{display:'flex', alignItems:'center', margin:0}}><Activity size={20} style={{marginRight: '8px'}}/> AI Ghost-Hunting Leakage Predictor</h3>
            <button className={`btn-primary btn-xs ${isScanning ? 'opacity-50' : ''}`} onClick={runLeakageScan} disabled={isScanning}>{isScanning ? 'Engine Running...' : 'Deep Scan'}</button>
          </div>
          <p style={{ opacity: 0.8 }}>Active neural-prediction isolated supply diversion probabilities.</p>
          <div style={{ height: 200, marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="zone" />
                <RechartsTooltip contentStyle={{ backgroundColor: 'var(--sand-100)', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="prob" radius={[4, 4, 0, 0]} name="Leakage Probability %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 2. Budget Allocation */}
        <section className="budget-view card">
          <div className="section-header">
            <h3><Wallet size={20} style={{marginRight: '8px'}}/> Macro Budget Mapping (PM-GKAY)</h3>
          </div>
          <h2 className="text-green">₹14.2 Crore</h2>
          <p style={{ opacity: 0.8 }}>Allocated this quarter. <strong className="text-saffron">{budgetUtil}% actively utilized</strong> for direct endpoints.</p>
          <div className="capacity-bar" style={{ background: 'rgba(255,255,255,0.1)', height: '12px', borderRadius: '6px', margin: '1rem 0', overflow: 'hidden' }}>
            <div style={{ width: `${budgetUtil}%`, background: 'var(--green-500)', height: '100%', transition: 'width 0.4s ease' }}></div>
          </div>
          <button className="btn-outline full-width" onClick={() => setBudgetUtil(prev => Math.min(100, prev + 5))}>Deploy 5% Emergency Reserve</button>
        </section>

        {/* 3. SMS Broadcast */}
        <section className="sms-view card">
          <div className="section-header">
            <h3><MessageSquare size={20} style={{marginRight: '8px'}}/> Automated Mass-SMS Drop Triggers</h3>
          </div>
          <p style={{ opacity: 0.8 }}>Bulk-ping slum/ward endpoints so families claim food before shops close.</p>
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', margin: '1rem 0' }}>
            <strong>Target:</strong> Domlur Ward (2,400 families)<br/>
            <strong>Message:</strong> "Ration stock arrived at FPS #2841."
          </div>
          {smsStatus === 'idle' ? (
            <button className="btn-primary full-width" onClick={sendSMS}>Initiate Server Trigger</button>
          ) : smsStatus === 'sending' ? (
            <button className="btn-primary full-width" style={{ opacity: 0.7 }} disabled>Broadcasting via NIC Node...</button>
          ) : (
            <div className="fade-up" style={{ padding: '0.8rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: '8px', color: '#22c55e', textAlign: 'center', fontWeight: 'bold' }}>✓ 2,400 Target Endpoints Pushed</div>
          )}
        </section>

        {/* 4. FPS Audits */}
        <section className="audit-view card">
          <div className="section-header">
            <h3><ClipboardCheck size={20} style={{marginRight: '8px'}}/> Instant FPS License Revocation</h3>
          </div>
          <p style={{ opacity: 0.8 }}>Surprise Inspection logs synced from local nodal networks.</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {fpsList.map(fps => (
              <li key={fps.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', background: fps.banned ? 'rgba(0,0,0,0.5)' : (fps.status === 'Failed' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)'), padding: '1rem', borderRadius: 8, opacity: fps.banned ? 0.5 : 1, transition: 'all 0.3s ease' }}>
                <span style={{textDecoration: fps.banned ? 'line-through' : 'none', fontSize: '1.1rem'}}>FPS #{fps.id} <strong>({fps.banned ? 'BANNED' : fps.status})</strong></span> 
                {fps.status === 'Failed' && !fps.banned ? (
                  <button className="btn-primary btn-xs" style={{ background: '#ef4444', borderColor: '#ef4444' }} onClick={() => setFpsList(fpsList.map(f => f.id === fps.id ? {...f, banned: true} : f))}>Revoke License</button>
                ) : fps.status === 'Passed' ? (
                  <span className="text-green font-mono">100% CLEAR</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DistrictAdmin;
