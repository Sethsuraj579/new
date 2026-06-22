import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('/api/logout/', {}, { withCredentials: true });
      } catch (err) {
        console.error('Logout error', err);
      } finally {
        onLogout();
        navigate('/');
      }
    };
    performLogout();
  }, [onLogout, navigate]);

  return <p>Logging out...</p>;
}

export default Logout;