import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const LoadingFallback = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--sand-50)',
    fontFamily: 'var(--font-display)',
    color: 'var(--green-600)',
    fontSize: '1.5rem'
  }}>
    ANNADATA CONNECT...
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <AnnadataNav />
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/donor" element={<DonorDashboard />} />
              <Route path="/beneficiary" element={<BeneficiaryPortal />} />
              <Route path="/ngo" element={<NGOOperations />} />
              <Route path="/government" element={<DistrictAdmin />} />
              <Route path="/volunteer" element={<VolunteerApp />} />
              <Route path="/impact" element={<ImpactDashboard />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
