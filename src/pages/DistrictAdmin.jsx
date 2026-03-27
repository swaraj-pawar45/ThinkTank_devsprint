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
  ChevronDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import './DistrictAdmin.css';

// Mock India Heatmap (Layer 1.4/3.7)
const DistrictHeatmap = () => (
  <div className="india-heatmap-placeholder">
    <div className="map-svg-mock">
      {/* Simulation of a mesh with regions */}
      <div className="region green" style={{top: '20%', left: '30%', width: '40px', height: '40px'}}></div>
      <div className="region amber" style={{top: '40%', left: '50%', width: '30px', height: '50px'}}></div>
      <div className="region red pulse" style={{top: '50%', left: '40%', width: '20px', height: '20px'}}></div>
      <div className="region green" style={{top: '60%', left: '60%', width: '30px', height: '30px'}}></div>
    </div>
    <div className="heatmap-legend">
      <span>Safe</span>
      <span>Moderate</span>
      <span>Critical</span>
    </div>
    <div className="heatmap-control">3D View High-Intensity</div>
  </div>
);

const DistrictAdmin = () => {
  const [district, setDistrict] = useState('Central Bengaluru');

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

        {/* ROW 2 - RIGHT: 3D HEATMAP */}
        <section className="heatmap-panel card">
          <div className="section-header">
            <h3>Need Intensity Map</h3>
            <span className="font-mono">Real-time Heatmap</span>
          </div>
          <DistrictHeatmap />
        </section>
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
          <div className="rec-card">
            <AlertOctagon size={24} color="var(--saffron-500)" />
            <div className="rec-info">
              <h4>Exclusion Error Detected</h4>
              <p>12 Households in Koramangala slum identified for inclusion via predictive mapping.</p>
            </div>
            <button className="btn-text">Approve Group Access →</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DistrictAdmin;
