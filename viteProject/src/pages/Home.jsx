// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    account.get()
      .then(setUser)
      .catch(() => navigate('/login'));
  }, []);

  const handleLogout = async () => {
    await account.deleteSession('current');
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
