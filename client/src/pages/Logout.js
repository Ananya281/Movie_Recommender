import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage or any auth tokens
    localStorage.clear();
    navigate('/login');
  }, [navigate]);

  return <div className="text-white p-8">Logging out...</div>;
};

export default Logout;
