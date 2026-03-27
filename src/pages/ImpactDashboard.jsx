import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
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
import './ImpactDashboard.css';

const ImpactDashboard = () => {
  const [mealCount, setMealCount] = useState(8245132);

  useEffect(() => {
    const interval = setInterval(() => {
      setMealCount(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: 'Oct', meals: 1200000 },
    { name: 'Nov', meals: 1800000 },
    { name: 'Dec', meals: 2400000 },
    { name: 'Jan', meals: 4200000 },
    { name: 'Feb', meals: 6800000 },
    { name: 'Mar', meals: 8245132 },
  ];

  const pieData = [
    { name: 'Cooked Meals', value: 45 },
    { name: 'Raw Grains', value: 30 },
    { name: 'Fresh Produce', value: 15 },
    { name: 'Packaged', value: 10 },
  ];

  const COLORS = ['var(--green-600)', 'var(--green-400)', 'var(--saffron-500)', 'var(--sand-200)'];

  const leaderboard = [
    { rank: 1, district: "Central Bengaluru", meals: "1,24,500", trend: "up" },
    { rank: 2, district: "Lucknow", meals: "98,200", trend: "up" },
    { rank: 3, district: "Mumbai Sub", meals: "85,400", trend: "down" },
    { rank: 4, district: "Chennai Proper", meals: "72,100", trend: "up" },
    { rank: 5, district: "Kolkata North", meals: "68,900", trend: "up" }
  ];

  return (
    <div className="impact-dashboard container fade-up">
      <header className="impact-header">
        <div className="label">Live National Impact</div>
        <h1>ANNADATA Force for Good</h1>
        <p>A transparent look at how India is bridging the hunger gap.</p>
      </header>

      {/* HERO STATS (Layer 2.2 PAGE 7) */}
      <section className="impact-hero-grid">
        <div className="hero-stat-main card">
          <div className="orb-viz">
            <ImpactOrb />
          </div>
          <div className="counter-stack">
            <span className="label">Total Meals Connected</span>
            <div className="main-counter font-mono">{mealCount.toLocaleString('en-IN')}</div>
            <div className="sub-label">Verified & Logged via Blockchain</div>
          </div>
        </div>
        
        <div className="impact-meta-cards">
          <div className="meta-card card">
            <Heart size={24} color="var(--urgent)" />
            <strong>19.4%</strong>
            <span>Leakage Reduced</span>
          </div>
          <div className="meta-card card">
            <Globe size={24} color="var(--green-500)" />
            <strong>247</strong>
            <span>Active Districts</span>
          </div>
        </div>
      </section>

      <div className="impact-data-grid">
        {/* GROWTH CHART */}
        <section className="growth-panel card">
          <h3>Monthly Scale</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--green-500)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--green-500)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--sand-200)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="meals" stroke="var(--green-500)" fillOpacity={1} fill="url(#colorMeals)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* PIE CHART */}
        <section className="category-panel card">
          <h3>Food Category Split</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-legend">
            {pieData.map((d, i) => (
              <div key={i} className="l-item">
                <span className="dot" style={{backgroundColor: COLORS[i]}}></span>
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* LEADERBOARD */}
      <section className="leaderboard-section card">
        <div className="section-header">
          <h3>District Resilience Leaderboard</h3>
          <button className="btn-text">View Full Map →</button>
        </div>
        <table className="impact-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>District</th>
              <th>Meals Rescued</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(item => (
              <tr key={item.rank}>
                <td><span className={`rank-badge ${item.rank <= 3 ? 'top' : ''}`}>{item.rank}</span></td>
                <td><strong>{item.district}</strong></td>
                <td className="font-mono">{item.meals}</td>
                <td className={item.trend}>
                  {item.trend === 'up' ? '↑ Increasing' : '↓ Decreasing'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* CORPORATE WALL */}
      <section className="corporate-wall">
        <h3>Institutional Partners</h3>
        <div className="logo-grid">
          {["Tata Group", "Reliance Foundation", "ITC Limited", "Adani Foundation", "Zomato Feeding India"].map(name => (
            <div key={name} className="logo-card">
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="impact-cta">
          <button className="btn-primary"><Share2 size={20} /> Share Progress</button>
          <button className="btn-outline">Download Transparency Report</button>
        </div>
      </section>
    </div>
  );
};

export default ImpactDashboard;
