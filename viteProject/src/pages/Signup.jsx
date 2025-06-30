// pages/Signup.jsx
import React, { useState } from 'react';
import { account, ID } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await account.create(ID.unique(), email, password, name);
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Register</button>
    </div>
  );
};

export default Signup;
