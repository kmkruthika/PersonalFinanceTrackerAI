import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API + '/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      nav('/');
    } catch (err) {
      console.error('Login error', err);
      alert(err.response?.data?.error || 'Login failed');
    }
  }
  return (
    <div style={{padding:20,maxWidth:420, margin:'40px auto', border:'1px solid #ddd', borderRadius:8}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><label>Email</label><br/><input value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div><label>Password</label><br/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have account? <a href="/signup">Sign up</a></p>
    </div>
  );
}
