import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  Map as MapIcon, 
  Bell, 
  CheckCircle2, 
  Clock, 
  Truck,
  ArrowUpRight,
  ShieldCheck,
  BarChart,
  Warehouse,
  FileCheck,
  Banknote
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import RoleHero from '../components/shared/RoleHero';
import LiveMapFilter from '../components/shared/LiveMapFilter';
import { useStore } from '../store/useStore';
import './NGOOperations.css';

/* Mock Volunteer Map Component Removed */

const NGOOperations = () => {
  const { foodFeed, deliveries, acceptSurplus } = useStore();
  const [storageFill, setStorageFill] = useState(82);
  const [volunteers, setVolunteers] = useState([ {id: 'v1', name: 'Rahul S.', loc: 'Indiranagar'}, {id: 'v2', name: 'Priya K.', loc: 'Domlur'} ]);
  const [audits, setAudits] = useState([ {id: 'a1', desc: 'Hotel Plaza - 45 Meals'}, {id: 'a2', desc: 'Bazaar - Grains'} ]);
  const [funding, setFunding] = useState(45000);
  
  const stats = [
    { label: 'Incoming Feed', value: foodFeed.filter(f => f.status === 'New').length, icon: <Package size={20} />, trend: 'Live' },
    { label: 'Volunteers Active', value: '24', icon: <Users size={20} />, trend: 'Stable' },
    { label: 'Served Today', value: '450', icon: <CheckCircle2 size={20} />, trend: '+12%' },
    { label: 'Active Pickups', value: deliveries.length, icon: <Clock size={20} />, trend: 'Tracking' }
  ];

  const handleAccept = (id) => {
    acceptSurplus(id, 'N201'); // Fixed ID for demo
    setStorageFill(prev => Math.min(100, prev + 8)); // Increase predictive storage visually
  };

  return (
    <div className="ngo-dashboard container fade-up">
      <RoleHero 
        title="NGO Operations Hub" 
        subtitle="Umeed Trust — Central Bengaluru Division" 
        icon={<ShieldCheck size={32} />} 
        rightContent={<div className="ngo-status-chip">Operational <Bell size={18} style={{marginLeft: '8px'}} /></div>}
      />

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-data">
              <span className="label">{s.label}</span>
              <div className="value-group">
                <span className="value font-mono">{s.value}</span>
                <span className={`trend ${s.trend.startsWith('+') ? 'up' : ''}`}>
                  {s.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="main-ops-grid">
        <section className="live-feed card">
          <div className="section-header">
            <h3>Live Surplus Feed</h3>
            <div className="feed-filters">
              <span className="active">All</span>
              <span>Bulk</span>
              <span>Cooked</span>
            </div>
          </div>
          
          <div className="feed-list">
            {foodFeed.map(item => (
              <div key={item.id} className={`feed-item ${item.status === 'Critical' ? 'critical-border' : ''} ${item.status === 'Matched' ? 'opacity-50' : ''}`}>
                <div className="feed-info">
                  <div className="donor-meta">
                    <strong>{item.donorName}</strong>
                    <span className="time">{item.status}</span>
                  </div>
                  <div className="food-meta">
                    <span className="type">{item.type}</span>
                    <span className="qty">{item.qty}</span>
                    <span className="dist">({item.dist} away)</span>
                  </div>
                </div>
                <div className="feed-actions">
                  {item.status !== 'Matched' ? (
                    <button className="btn-primary btn-sm" onClick={() => handleAccept(item.id)}>Accept</button>
                  ) : (
                    <button className="btn-outline btn-sm" disabled>Matched</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <LiveMapFilter foodFeed={foodFeed} deliveries={deliveries} role="NGO" />
      </div>

      <section className="delivery-tracker card">
        <div className="section-header">
          <h3>Active Deliveries</h3>
        </div>
        <table className="ops-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Volunteer</th>
              <th>Destination</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(d => (
              <tr key={d.id}>
                <td className="font-mono">#{d.id}</td>
                <td>{d.task}</td>
                <td>{d.volunteerName}</td>
                <td>{d.dest}</td>
                <td><span className={`status-pill ${d.status.toLowerCase().replace(' ', '-')}`}>{d.status}</span></td>
                <td><Truck size={16} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* NEW FEATURES BATCH */}
      <h2 className="section-title" style={{marginTop: '3rem'}}>Extended Operations</h2>
      
      <div className="main-ops-grid" style={{ marginTop: '1rem' }}>
        {/* 1. Data Analyst */}
        <section className="analyst-view card">
          <div className="section-header">
            <h3><BarChart size={20} style={{marginRight: '8px'}} /> Data Analyst: Distribution Times</h3>
          </div>
          <div style={{ height: 250, marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={[
                { route: 'Koramangala', timeMins: 45 },
                { route: 'Indiranagar', timeMins: 30 },
                { route: 'Whitefield', timeMins: 65 },
                { route: 'Majestic', timeMins: 50 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="route" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="timeMins" fill="var(--saffron-500)" radius={[4, 4, 0, 0]} name="Avg Min/Delivery" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 2. Predictive Storage Capacity */}
        <section className="storage-view card">
          <div className="section-header">
            <h3><Warehouse size={20} style={{marginRight: '8px'}} /> Predictive Storage Planner</h3>
          </div>
          <div className="capacity-bar" style={{ background: 'rgba(255,255,255,0.1)', height: '24px', borderRadius: '12px', marginTop: '1rem', overflow: 'hidden' }}>
            <div style={{ width: `${storageFill}%`, background: storageFill > 90 ? '#ef4444' : 'var(--blue-500)', height: '100%', transition: 'width 0.4s ease' }}></div>
          </div>
          <p style={{ marginTop: '0.5rem', opacity: 0.8 }}><strong style={{color: storageFill>90?'#ef4444':'inherit'}}>{storageFill}% Full</strong> (150 kg limit)</p>
          <button className="btn-outline btn-sm" style={{ marginTop: '1rem' }} onClick={() => setStorageFill(45)}>Log Dispatched Food (Clear Space)</button>
        </section>

        {/* 3. Dynamic Volunteer Dispatch */}
        <section className="volunteer-mgmt card">
          <div className="section-header">
            <h3><Users size={20} style={{marginRight: '8px'}} /> Dynamic Volunteer Dispatch</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            {volunteers.map(v => (
              <li key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <span><strong>{v.name}</strong><br/><span style={{fontSize:'12px',opacity:0.6}}>{v.loc} • Idle Network</span></span>
                <button className="btn-primary btn-xs" onClick={() => setVolunteers(volunteers.filter(vol => vol.id !== v.id))}>Comm. Dispatch</button>
              </li>
            ))}
            {volunteers.length === 0 && <p style={{opacity:0.6}}>All local volunteers are actively in transit.</p>}
          </ul>
        </section>

        {/* 4. Digital Hygiene Quality Checks */}
        <section className="quality-check card">
          <div className="section-header">
            <h3><FileCheck size={20} style={{marginRight: '8px'}} /> Digital Hygiene Audit Gates</h3>
          </div>
          <p style={{ opacity: 0.8, marginBottom: '1rem' }}>Mandatory FSSAI compliance check before food leaves the NGO.</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {audits.map(a => (
              <li key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'center' }}>
                <span className="font-mono" style={{fontSize: '13px'}}>{a.desc}</span> 
                <button className="btn-outline btn-xs" style={{display:'flex', alignItems:'center', gap:'4px'}} onClick={() => setAudits(audits.filter(ab => ab.id !== a.id))}><ShieldCheck size={14}/> Sign Off</button>
              </li>
            ))}
            {audits.length === 0 && <p className="text-green" style={{display:'flex', alignItems:'center', gap:'8px'}}><CheckCircle2 size={16} /> All shipments digitally verified.</p>}
          </ul>
        </section>

        {/* 5. Automated CSR Funding & Grants */}
        <section className="funding-view card" style={{ gridColumn: 'span 1' }}>
          <div className="section-header">
            <h3><Banknote size={20} style={{marginRight: '8px'}} /> Automated CSR Grants</h3>
          </div>
          <h2>₹{(funding/1000).toFixed(1)}k / ₹100k</h2>
          <p style={{ opacity: 0.8 }}>Monthly logistics funding goal from corporate CSR.</p>
          <div className="capacity-bar" style={{ background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', margin: '1rem 0', overflow: 'hidden' }}>
            <div style={{ width: `${(funding/100000)*100}%`, background: 'var(--saffron-500)', height: '100%', transition: 'width 0.4s ease' }}></div>
          </div>
          <button className="btn-outline full-width" onClick={() => setFunding(prev => Math.min(100000, prev + 5000))}>Ping Corporate Match Link</button>
        </section>
      </div>
    </div>
  );
};

export default NGOOperations;
