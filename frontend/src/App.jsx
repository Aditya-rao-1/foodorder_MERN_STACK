// ...existing code...
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import SignUpform from './pages/SignUpform';
import SignInform from './pages/SignInform';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Cart from "./pages/Cart";
import OrederdFood from './pages/OrederdFood';
import MyAcc from './pages/MyAcc';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('loggedInUser');
    if (userEmail) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      const currentPath = window.location.pathname;
      if (currentPath !== '/signup') {
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (isLoggedIn === null) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpform />} />
        <Route path="/login" element={<SignInform onLogin={handleLogin} />} />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home loggedInUser={isLoggedIn} onLogout={handleLogout} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orederedfood" element={<OrederdFood />} />
            <Route path="/myacc" element={<MyAcc />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
      <ButtonGradient />
    </div>
  );
};

export default App;