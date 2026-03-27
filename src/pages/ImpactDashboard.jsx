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
import { Globe, Award, Heart, Share2 } from 'lucide-react';
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
            <span className="label">Total Meals Connected</span>
            <div className="main-counter font-mono">{impactStats.totalMeals.toLocaleString('en-IN')}</div>
            <div className="sub-label">Verified & Logged via Blockchain</div>
          </div>
        </div>
        
        <div className="impact-meta-cards">
          <div className="meta-card card">
            <Heart size={24} color="var(--urgent)" />
            <strong>{impactStats.leakageReduced}%</strong>
            <span>Leakage Reduced</span>
          </div>
          <div className="meta-card card">
            <Globe size={24} color="var(--green-500)" />
            <strong>{impactStats.districts}</strong>
            <span>Active Districts</span>
          </div>
        </div>
      </section>

      <div className="impact-data-grid">
        <section className="growth-panel card">
          <h3>Monthly Scale</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--sand-200)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="meals" stroke="var(--green-500)" fill="rgba(61, 107, 31, 0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="category-panel card">
          <h3>Food Category Split</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
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
