import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Dashboard from './pages/Dashboard';
import RamadanPlanner from './pages/RamadanPlanner';
import RamadanWrapped from './pages/RamadanWrapped';
import MuhasabaLogs from './pages/MuhasabaLogs';
import Login from './pages/Login';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="mesh-gradient" />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--color-obsidian-900, #0f1117)',
              color: '#f8f4ec',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '12px',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: '600',
            },
          }}
        />
        <Routes>
          {/* Root → Dashboard directly (no login required to explore) */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Login page — only needed when user wants to save data */}
          <Route path="/login" element={<Login />} />

          {/* All pages are publicly accessible — auth is checked inline when saving */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ramadan" element={<RamadanPlanner />} />
          <Route path="/ramadan/wrapped" element={<RamadanWrapped />} />
          <Route path="/muhasaba" element={<MuhasabaLogs />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
