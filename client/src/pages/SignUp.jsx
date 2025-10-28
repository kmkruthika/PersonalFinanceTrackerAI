import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log('Calling API:', API + '/api/auth/signup');
      const res = await axios.post(
        API + '/api/auth/signup',
        { name, email, password }
      );
      localStorage.setItem('token', res.data.token);
      nav('/');
    } catch (err) {
      console.error('Signup error', err);
      const msg = err?.response?.data?.error || err.message || 'Signup failed';
      alert(msg);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 420,
        margin: '40px auto',
        border: '1px solid #7589e0ff',
        borderRadius: 8,
      }}
    >
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name</label><br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label><br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create account</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
