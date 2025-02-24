import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import { getCurrentUser, logout } from './services/authService';

const App: React.FC = () => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <Router>
      <div>
        <nav>
          {user.token ? (
            <button onClick={() => { logout(); setUser({}); }}>Logout</button>
          ) : (
            <>
              <a href="/login" style={{ marginRight: '10px' }}>Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={user.token ? <TasksPage /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;