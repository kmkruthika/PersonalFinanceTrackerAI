
import React, { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function ExpenseForm({ onAdded }){
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const submit = async (e) => {
    e && e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(API + '/api/expenses', { amount: Number(amount), description, date }, { headers: { Authorization: 'Bearer ' + token } });
      setAmount(''); setDescription(''); setDate('');
      onAdded && onAdded();
    } catch (err) {
      alert('Failed to add expense');
    }
  }

  return (
    <form onSubmit={submit} style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>
      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} required />
      <input placeholder="Description (e.g., coffee, uber)" value={description} onChange={e=>setDescription(e.target.value)} />
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
