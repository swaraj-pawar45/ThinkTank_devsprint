import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load pages for Layer 2 implementation
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DonorDashboard = lazy(() => import('./pages/DonorDashboard'));
const BeneficiaryPortal = lazy(() => import('./pages/BeneficiaryPortal'));
const NGOOperations = lazy(() => import('./pages/NGOOperations'));
const DistrictAdmin = lazy(() => import('./pages/DistrictAdmin'));
const VolunteerApp = lazy(() => import('./pages/VolunteerApp'));
const ImpactDashboard = lazy(() => import('./pages/ImpactDashboard'));

// Shared Components
import AnnadataNav from './components/shared/AnnadataNav';
import ServerSimulator from './components/shared/ServerSimulator';
import AuthOverlay from './components/shared/AuthOverlay';

// Protection Wrapper (Layer 4 Auth implementation)
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Or unauthorized page
  }
  return children;
};

const LoadingFallback = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--sand-50)', fontFamily: 'var(--font-display)', color: 'var(--green-600)', fontSize: '1.2rem' }}>
    ANNADATA CONNECT...
  </div>
);

function AppContent() {
  return (
    <div className="app-container">
      <ServerSimulator />
      <AnnadataNav />
      <AuthOverlay />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            {/* Dashboard Protection Layers */}
            <Route path="/donor" element={
              <ProtectedRoute allowedRoles={['donor']}><DonorDashboard /></ProtectedRoute>
            } />
            <Route path="/beneficiary" element={
              <ProtectedRoute allowedRoles={['beneficiary']}><BeneficiaryPortal /></ProtectedRoute>
            } />
            <Route path="/ngo" element={
              <ProtectedRoute allowedRoles={['ngo']}><NGOOperations /></ProtectedRoute>
            } />
            <Route path="/government" element={
              <ProtectedRoute allowedRoles={['government']}><DistrictAdmin /></ProtectedRoute>
            } />
            <Route path="/volunteer" element={
              <ProtectedRoute allowedRoles={['volunteer']}><VolunteerApp /></ProtectedRoute>
            } />
            
            {/* Public Hub */}
            <Route path="/impact" element={<ImpactDashboard />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
