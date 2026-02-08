import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RamadanPlanner from './pages/RamadanPlanner'; 
import RamadanWrapped from './pages/RamadanWrapped';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/ramadan"
          element={
            <ProtectedRoute>
              <RamadanPlanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ramadan/wrapped"
          element={
            <ProtectedRoute>
              <RamadanWrapped />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;