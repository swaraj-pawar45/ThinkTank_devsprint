import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthOverlay.css';

const AuthOverlay = () => {
  const { isAuthOpen, closeAuthModal, authMode, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: '', password: '', role: 'donor', name: '', area: '' 
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(authMode === 'login');
  }, [authMode, isAuthOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate(`/${res.user.role}`);
        closeAuthModal();
      } else {
        setError(res.error);
      }
    } else {
      const res = await signup(formData);
      if (res.success) {
        navigate(`/${formData.role}`);
        closeAuthModal();
      } else {
        setError(res.error);
      }
    }
    setLoading(false);
  };

  if (!isAuthOpen) return null;

  return (
    <div className="auth-overlay-backdrop fade-in">
      <div className="auth-card card stagger-1">
        <button className="close-btn" onClick={closeAuthModal}><X /></button>
        
        <div className="auth-header">
          <div className="hindi-tag">ANNADATA CONNECT</div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to access your digital food bridge.' : 'Join the nationwide distribution network.'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-badge">{error}</div>}
          
          {!isLogin && (
            <>
              <div className="form-group">
                <label>User Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="donor">Bulk Donor</option>
                  <option value="ngo">NGO Partner</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="government">Government Admin</option>
                  <option value="beneficiary">Beneficiary</option>
                </select>
              </div>
              <div className="form-group icon-input">
                <User size={18} />
                <input type="text" placeholder="Full Name / Org Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
            </>
          )}

          <div className="form-group icon-input">
            <Mail size={18} />
            <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          {!isLogin && (
            <div className="form-group icon-input">
              <MapPin size={18} />
              <input type="text" placeholder="Service Area (e.g. Indiranagar)" required value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
            </div>
          )}

          <div className="form-group icon-input">
            <Lock size={18} />
            <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isLogin ? "New to Annadata?" : "Already have an account?"}</span>
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up Now' : 'Sign In Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
