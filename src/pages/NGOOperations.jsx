import React, { useState } from 'react';
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
import { useStore } from '../store/useStore';
import './NGOOperations.css';

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
  const { foodFeed, deliveries, acceptSurplus } = useStore();
  
  const stats = [
    { label: 'Incoming Feed', value: foodFeed.filter(f => f.status === 'New').length, icon: <Package size={20} />, trend: 'Live' },
    { label: 'Volunteers Active', value: '24', icon: <Users size={20} />, trend: 'Stable' },
    { label: 'Served Today', value: '450', icon: <CheckCircle2 size={20} />, trend: '+12%' },
    { label: 'Active Pickups', value: deliveries.length, icon: <Clock size={20} />, trend: 'Tracking' }
  ];

  const handleAccept = (id) => {
    acceptSurplus(id, 'N201'); // Fixed ID for demo
  };

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

        <section className="map-view card">
          <div className="section-header">
            <h3>Volunteer Network</h3>
            <span className="live-indicator">LIVE</span>
          </div>
          <VolunteerMap />
        </section>
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
    </div>
  );
};

export default NGOOperations;
