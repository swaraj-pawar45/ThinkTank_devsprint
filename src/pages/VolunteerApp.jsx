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
import { useStore } from '../store/useStore';
import './VolunteerApp.css';

const VolunteerApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [status, setStatus] = useState('idle'); 
  
  const { volunteers, deliveries, completeTask } = useStore();
  const myData = volunteers.find(v => v.id === 'V1') || volunteers[0];
  const myActiveTask = deliveries.find(d => d.volunteerName === myData.name) || (status !== 'idle' ? deliveries[0] : null);

  const handleAction = () => {
    if (status === 'assigned') setStatus('picked_up');
    else if (status === 'picked_up') {
      completeTask(myActiveTask.id, myData.id);
      setStatus('delivered');
    }
  };

  return (
    <div className="volunteer-app-container fade-up">
      <div className="mobile-view">
        <header className="volunteer-header">
          <div className="user-info">
            <div className="avatar">{myData.name.split(' ').map(n=>n[0]).join('')}</div>
            <div className="meta">
              <h3>{myData.name}</h3>
              <div className="rating">
                {[1,2,3,4].map(i => <Star key={i} size={12} fill="var(--saffron-500)" stroke="none" />)}
                <Star size={12} fill="rgba(0,0,0,0.1)" stroke="none" />
                <span>{myData.rating}</span>
              </div>
            </div>
          </div>
          <div className="points-badge">
            <Award size={16} />
            <span>{myData.points} pts</span>
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
              <h2>Great Job!</h2>
              <p>Task completed successfully. 50 Impact Points added.</p>
              <button className="btn-outline full-width" onClick={() => setStatus('idle')}>Go Offline</button>
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
                <button className="btn-navigate"><Navigation size={18} /> Navigate</button>
                <button className="btn-primary" onClick={handleAction}>
                  {status === 'assigned' ? 'Mark Picked Up' : 'Confirm Delivery'}
                </button>
              </div>
            </section>
          )}

          <section className="nearby-section">
            <div className="section-header">
              <h3>Available Nearby</h3>
            </div>
            <div className="task-list">
              <div className="task-item card">
                <div className="t-info">
                  <strong>45 Servings Available</strong>
                  <span>Hotel Plaza • 0.8km</span>
                </div>
                <div className="t-reward">
                  <span className="pts">+25</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </section>
        </main>

        <nav className="mobile-nav">
          <button className="active"><Home size={20} /><span>Home</span></button>
          <button><Layers size={20} /><span>Tasks</span></button>
          <button><ClipboardList size={20} /><span>Logs</span></button>
          <button><User size={20} /><span>Me</span></button>
        </nav>
      </div>
    </div>
  );
};

export default VolunteerApp;
