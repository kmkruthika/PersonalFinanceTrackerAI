import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Dashboard(){
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);

  const fetch = async ()=> {
    const token = localStorage.getItem('token');
    const res = await axios.get(API + '/api/expenses', { headers: { Authorization: 'Bearer ' + token } });
    setExpenses(res.data);
    const map = {};
    res.data.forEach(e=> map[e.category] = (map[e.category]||0) + e.amount);
    const arr = Object.keys(map).map(k=> ({ name:k, value: map[k] }));
    setSummary(arr);
  }

  useEffect(()=> { fetch(); }, []);

  // 🎨 Add custom slice colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f472b6'];

  return (
    <div style={{padding:20,maxWidth:900, margin:'20px auto'}}>
      <h1>AI Finance Tracker</h1>
      <ExpenseForm onAdded={fetch} />
      <div style={{display:'flex', gap:20, marginTop:20}}>
        <div style={{flex:1}}><ExpenseList expenses={expenses} refresh={fetch} /></div>
        <div style={{width:350}}>
          <h3>Spending by category</h3>
          <PieChart width={300} height={300}>
            <Pie data={summary} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {summary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip/>
            <Legend/>
          </PieChart>
        </div>
      </div>
    </div>
  );
}
