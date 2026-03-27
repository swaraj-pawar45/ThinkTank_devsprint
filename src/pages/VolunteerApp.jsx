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
  ArrowRight
} from 'lucide-react';
import './VolunteerApp.css';

const VolunteerApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [status, setStatus] = useState('idle'); // idle, assigned, picked_up, delivered
  const [points, setPoints] = useState(1240);

  const handleAction = () => {
    if (status === 'assigned') setStatus('picked_up');
    else if (status === 'picked_up') {
      setStatus('delivered');
      setPoints(prev => prev + 50);
      // Simulate confetti in Layer 3.2
    }
  };

  const nearbyTasks = [
    { id: 1, food: "45 Meals", donor: "Royal Plaza", dist: "0.8km", points: 25, urgent: true },
    { id: 2, food: "12kg Grains", donor: "Indiranagar FPS", dist: "1.2km", points: 15, urgent: false },
    { id: 3, food: "Vegetables (Bulk)", donor: "Farmer's Hub", dist: "2.5km", points: 30, urgent: false }
  ];

  return (
    <div className="volunteer-app-container fade-up">
      {/* MOBILE-FIRST WRAPPER (375px optimized) */}
      <div className="mobile-view">
        <header className="volunteer-header">
          <div className="user-info">
            <div className="avatar">RS</div>
            <div className="meta">
              <h3>Rahul Sharma</h3>
              <div className="rating">
                <Star size={12} fill="var(--saffron-500)" stroke="none" />
                <Star size={12} fill="var(--saffron-500)" stroke="none" />
                <Star size={12} fill="var(--saffron-500)" stroke="none" />
                <Star size={12} fill="var(--saffron-500)" stroke="none" />
                <Star size={12} fill="rgba(0,0,0,0.1)" stroke="none" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div className="points-badge">
            <Award size={16} />
            <span>{points} pts</span>
          </div>
        </header>

        <main className="volunteer-main">
          {status === 'idle' ? (
            <div className="idle-view">
              <div className="status-banner card">
                <h4>You are Online</h4>
                <p>Waiting for nearby pickup requests...</p>
              </div>
              <button className="btn-primary full-width" onClick={() => setStatus('assigned')}>
                Find Nearest Task
              </button>
            </div>
          ) : status === 'delivered' ? (
            <div className="success-view card fade-up">
              <div className="success-icon">✓</div>
              <h2>Great Job, Rahul!</h2>
              <p>You just fed 45 people. 50 Impact Points added.</p>
              <button className="btn-outline full-width" onClick={() => setStatus('idle')}>Complete & Go Offline</button>
            </div>
          ) : (
            <section className="active-task card fade-up">
              <div className="task-header">
                <span className="task-id">TASK #DX-902</span>
                <span className={`status-tag ${status}`}>{status.replace('_', ' ')}</span>
              </div>
              
              <div className="location-flow">
                <div className="loc-item">
                  <div className="dot start"></div>
                  <div className="info">
                    <label>Pickup From</label>
                    <strong>Hotel Royal Plaza, Indiranagar</strong>
                  </div>
                </div>
                <div className="line"></div>
                <div className="loc-item">
                  <div className="dot end"></div>
                  <div className="info">
                    <label>Drop To</label>
                    <strong>Umeed Trust Center, Ward 82</strong>
                  </div>
                </div>
              </div>

              <div className="task-meta-grid">
                <div className="m-item">
                  <Clock size={16} />
                  <span>Before 2:30 PM</span>
                </div>
                <div className="m-item">
                  <MapPin size={16} />
                  <span>1.2 km total</span>
                </div>
              </div>

              <div className="task-actions">
                <button className="btn-navigate">
                  <Navigation size={18} /> Navigate
                </button>
                <button className="btn-primary" onClick={handleAction}>
                  {status === 'assigned' ? 'Mark Picked Up' : 'Confirm Delivery'}
                </button>
              </div>
            </section>
          )}

          <section className="nearby-section">
            <div className="section-header">
              <h3>Available Nearby</h3>
              <span className="count">3 Tasks</span>
            </div>
            <div className="task-list">
              {nearbyTasks.map(task => (
                <div key={task.id} className="task-item card">
                  <div className="t-info">
                    <strong>{task.food}</strong>
                    <span>{task.donor} • {task.dist}</span>
                  </div>
                  <div className="t-reward">
                    <span className="pts">+{task.points}</span>
                    <ArrowRight size={18} />
                  </div>
                  {task.urgent && <div className="urgent-label">URGENT</div>}
                </div>
              ))}
            </div>
          </section>
        </main>

        <nav className="mobile-nav">
          <button className="active"><Home size={20} /><span>Home</span></button>
          <button><Layers size={20} /><span>Available</span></button>
          <button><ClipboardList size={20} /><span>History</span></button>
          <button><User size={20} /><span>Profile</span></button>
        </nav>
      </div>
    </div>
  );
};

export default VolunteerApp;
