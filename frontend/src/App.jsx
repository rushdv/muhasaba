import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RamadanPlanner from './pages/RamadanPlanner'; // নতুন ইম্পোর্ট
import RamadanWrapped from './pages/RamadanWrapped';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* মেইন ড্যাশবোর্ড (Hub) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* প্রিমিয়াম রমজান প্ল্যানার রুট */}
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