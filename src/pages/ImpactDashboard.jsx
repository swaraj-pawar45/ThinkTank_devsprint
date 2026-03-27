import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Globe, Award, Heart, Share2, Zap, Droplets, Leaf, ShieldCheck, Activity } from 'lucide-react';
import ImpactOrb from '../components/three/ImpactOrb';
import { useStore } from '../store/useStore';
import './ImpactDashboard.css';

const ImpactDashboard = () => {
  const { impactStats } = useStore();

  const chartData = [
    { name: 'Oct', meals: 1200000 },
    { name: 'Nov', meals: 1800000 },
    { name: 'Dec', meals: 2400000 },
    { name: 'Jan', meals: 4200000 },
    { name: 'Feb', meals: 6800000 },
    { name: 'Mar', meals: impactStats.totalMeals },
  ];

  const pieData = [
    { name: 'Cooked Meals', value: 45 },
    { name: 'Raw Grains', value: 30 },
    { name: 'Fresh Produce', value: 15 },
    { name: 'Packaged', value: 10 },
  ];

  const COLORS = ['var(--green-600)', 'var(--green-400)', 'var(--saffron-500)', 'var(--sand-200)'];

  return (
    <div className="impact-dashboard container fade-up">
      <header className="impact-header">
        <div className="label">Live National Impact</div>
        <h1>ANNADATA Force for Good</h1>
        <p>A transparent look at how India is bridging the hunger gap.</p>
      </header>

      <section className="impact-hero-grid">
        <div className="hero-stat-main card">
          <div className="orb-viz">
            <ImpactOrb />
          </div>
          <div className="counter-stack">
            <span className="label">Total Verified Meals connected</span>
            <div className="main-counter font-mono glitch-text" data-text={impactStats.totalMeals.toLocaleString('en-IN')}>
              {impactStats.totalMeals.toLocaleString('en-IN')}
            </div>
            <div className="sub-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={14} /> Immutable Blockchain Ledger Logged
            </div>
          </div>
        </div>
        
        <div className="impact-meta-cards">
          <div className="meta-card card glass">
            <div className="icon-ring neon-green"><Leaf size={24} /></div>
            <div className="meta-info">
              <strong className="text-gradient-green">{impactStats.leakageReduced}%</strong>
              <span>Leakage Terminated</span>
            </div>
          </div>
          <div className="meta-card card glass">
            <div className="icon-ring neon-blue"><Globe size={24} /></div>
            <div className="meta-info">
              <strong className="text-gradient-blue">{impactStats.districts}</strong>
              <span>Active Districts</span>
            </div>
          </div>
        </div>
      </section>

      <section className="environmental-beast-stats">
        <div className="beast-stat-card card">
           <Droplets size={32} color="#3b82f6" />
           <div className="stat-content">
              <h3>2.4M Liters</h3>
              <p>Water Footprint Saved</p>
           </div>
        </div>
        <div className="beast-stat-card card">
           <Zap size={32} color="#fbbf24" />
           <div className="stat-content">
              <h3>840 MWh</h3>
              <p>Energy Recovered</p>
           </div>
        </div>
        <div className="beast-stat-card card">
           <Activity size={32} color="#10b981" />
           <div className="stat-content">
              <h3>15.2k Tons</h3>
              <p>Carbon Delta Offset</p>
           </div>
        </div>
      </section>

      <div className="impact-main-content">
        <div className="left-visual-column">
          <section className="growth-panel card glass">
            <div className="section-header">
               <h3>Exponential Scale Engine</h3>
               <span className="badge-live">Live Feed</span>
            </div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--saffron-500)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--saffron-500)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-dim)', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid var(--border-light)', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--saffron-500)' }}
                  />
                  <Area type="monotone" dataKey="meals" stroke="var(--saffron-500)" strokeWidth={4} fillOpacity={1} fill="url(#colorMeals)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="category-panel card glass">
            <h3>Verified Supply Composition</h3>
            <div className="composition-grid">
               <div className="pie-container">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="pie-legend-beast">
                  {pieData.map((item, idx) => (
                    <div key={idx} className="legend-row">
                       <span className="dot" style={{ backgroundColor: COLORS[idx] }}></span>
                       <span className="label text-dim">{item.name}</span>
                       <span className="val">{item.value}%</span>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        </div>

        <aside className="right-ledger-column">
          <div className="ledger-card card glass">
             <div className="section-header">
                <h3>Live Node Ledger</h3>
                <div className="status-dot-pulse"></div>
             </div>
             <div className="ledger-stream">
               {[
                 { id: 'TX-8821', hub: 'ITC Gardenia', city: 'BLR', qty: '120kg', h: '0x8f2d' },
                 { id: 'TX-8822', hub: 'Taj Vivanta', city: 'BLR', qty: '85kg', h: '0x3a1c' },
                 { id: 'TX-8823', hub: 'Bazaar Hub', city: 'DEL', qty: '450kg', h: '0xe4e1' },
                 { id: 'TX-8824', hub: 'Akshaya P.', city: 'MUM', qty: '1.2t', h: '0x99f2' },
                 { id: 'TX-8825', hub: 'Umeed Trust', city: 'HYD', qty: '200kg', h: '0xcc81' },
                 { id: 'TX-8826', hub: 'Feeding I.', city: 'PUN', qty: '90kg', h: '0xbb12' },
               ].map((tx, i) => (
                 <div key={i} className="ledger-entry fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="tx-head">
                       <span className="tx-id font-mono">{tx.id}</span>
                       <span className="tx-hash font-mono text-dim">{tx.h}</span>
                    </div>
                    <div className="tx-body">
                       <strong>{tx.hub}</strong>
                       <span className="tx-qty text-saffron">{tx.qty}</span>
                    </div>
                    <div className="tx-footer">
                       <span className="tx-loc">{tx.city} Node • Verified</span>
                    </div>
                 </div>
               ))}
             </div>
             <button className="btn-full-ledger btn-text">View Global Chain Explorer →</button>
          </div>
        </aside>
      </div>

      <section className="corporate-wall">
        <h3>Institutional Partners</h3>
        <div className="logo-grid">
          {["Tata Group", "Reliance Foundation", "ITC Limited", "Adani Foundation", "Zomato Feeding India"].map(name => (
            <div key={name} className="logo-card">
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImpactDashboard;
