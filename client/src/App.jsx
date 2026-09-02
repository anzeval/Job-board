import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import AddJobPage from './pages/AddJobPage.jsx';
import AllJobsPage from './pages/AllJobsPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="all-jobs" replace />} />
        <Route path="all-jobs" element={<AllJobsPage />} />
        <Route path="add-job" element={<AddJobPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
