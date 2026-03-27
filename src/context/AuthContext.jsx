import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Global Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Load from session on boot
  useEffect(() => {
    const savedUser = localStorage.getItem('annadata_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => setIsAuthOpen(false);

  const login = async (email, password) => {
    const res = await apiService.login(email, password);
    
    if (res && res.success) {
      setUser(res.user);
      localStorage.setItem('annadata_user', JSON.stringify(res.user));
      return { success: true, user: res.user };
    }
    return { success: false, error: res?.error || "Invalid Credentials" };
  };

  const signup = async (userData) => {
    const res = await apiService.signup(userData);
    
    if (res && res.success) {
      setUser(userData);
      localStorage.setItem('annadata_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: res?.error || "Error creating account" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('annadata_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, signup, logout, loading,
      isAuthOpen, authMode, openAuthModal, closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
