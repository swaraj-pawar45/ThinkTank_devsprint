import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  Map as MapIcon, 
  Bell, 
  CheckCircle2, 
  Clock, 
  Truck,
  ArrowUpRight
} from 'lucide-react';
import './NGOOperations.css';

// We'll use a placeholder for the Three.js map for now or a simple version
const VolunteerMap = () => (
  <div className="volunteer-map-placeholder">
    <MapIcon size={48} opacity={0.2} />
    <span>Three.js Volunteer Heatmap Rendering...</span>
    <div className="map-overlay">
      <div className="v-dot" style={{top: '20%', left: '30%'}}></div>
      <div className="v-dot" style={{top: '50%', left: '60%'}}></div>
      <div className="v-dot" style={{top: '70%', left: '40%'}}></div>
    </div>
  </div>
);

const NGOOperations = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const stats = [
    { label: 'Incoming Today', value: '12', icon: <Package size={20} />, trend: '+3' },
    { label: 'Volunteers Active', value: '24', icon: <Users size={20} />, trend: 'Stable' },
    { label: 'Served Today', value: '450', icon: <CheckCircle2 size={20} />, trend: '+12%' },
    { label: 'Pending Pickups', value: '5', icon: <Clock size={20} />, trend: '-2' }
  ];

  const incomingDonations = [
    { id: 101, donor: "Hotel Royal Plaza", type: "Cooked Meals", qty: "45 Servings", dist: "1.2km", status: "New", time: "15 mins ago" },
    { id: 102, donor: "Big Bazaar - Indiranagar", type: "Raw Grains", qty: "120kg", dist: "3.5km", status: "Critical", time: "2 mins ago" },
    { id: 103, donor: "Local Farmer's Market", type: "Vegetables", qty: "40kg", dist: "2.1km", status: "Matched", time: "1 hour ago" }
  ];

  return (
    <div className="ngo-dashboard container fade-up">
      <header className="ngo-header">
        <div className="ngo-info">
          <h1>NGO Operations Hub</h1>
          <p>Umeed Trust — Central Bengaluru Division</p>
        </div>
        <div className="header-actions">
          <button className="btn-icon"><Bell size={20} /></button>
          <div className="ngo-status-chip">Operational</div>
        </div>
      </header>

      {/* STATS BAR (Layer 2.2 PAGE 4) */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-data">
              <span className="label">{s.label}</span>
              <div className="value-group">
                <span className="value font-mono">{s.value}</span>
                <span className={`trend ${s.trend.startsWith('+') ? 'up' : s.trend.startsWith('-') ? 'down' : ''}`}>
                  {s.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="main-ops-grid">
        {/* LIVE FEED (60%) */}
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
            {incomingDonations.map(item => (
              <div key={item.id} className={`feed-item ${item.status === 'Critical' ? 'critical-border' : ''}`}>
                <div className="feed-info">
                  <div className="donor-meta">
                    <strong>{item.donor}</strong>
                    <span className="time">{item.time}</span>
                  </div>
                  <div className="food-meta">
                    <span className="type">{item.type}</span>
                    <span className="qty">{item.qty}</span>
                    <span className="dist">({item.dist} away)</span>
                  </div>
                </div>
                <div className="feed-actions">
                  <button className="btn-primary btn-sm">Accept</button>
                  <button className="btn-outline btn-sm">Delegate</button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-text full-width">View All Activity →</button>
        </section>

        {/* VOLUNTEER MAP (40%) */}
        <section className="map-view card">
          <div className="section-header">
            <h3>Volunteer Network</h3>
            <span className="live-indicator">LIVE</span>
          </div>
          <VolunteerMap />
          <div className="map-footer">
            <div className="m-info">
              <div className="v-dot green"></div>
              <span>18 Available</span>
            </div>
            <div className="m-info">
              <div className="v-dot amber"></div>
              <span>6 On Task</span>
            </div>
          </div>
        </section>
      </div>

      {/* BOTTOM TRACKER */}
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
            <tr>
              <td className="font-mono">#DX-902</td>
              <td>50kg Rice Pickup</td>
              <td>Rahul S.</td>
              <td>FPS #2841</td>
              <td><span className="status-pill transit">In Transit</span></td>
              <td><Truck size={16} /></td>
            </tr>
            <tr>
              <td className="font-mono">#DX-904</td>
              <td>Lunch Bulk (40)</td>
              <td>Priya M.</td>
              <td>Indiranagar Slum</td>
              <td><span className="status-pill assigned">Assigned</span></td>
              <td><ArrowUpRight size={16} /></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default NGOOperations;
