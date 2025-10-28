import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the color palette (Step 1)
const COLORS = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#A855F7', '#EC4899']; 

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Dashboard(){
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  
  // Calculate Total Spending for a KPI card
  const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0); 
  
  const fetch = async ()=> {
    // ... (Your fetch logic remains the same)
    const token = localStorage.getItem('token');
    const res = await axios.get(API + '/api/expenses', { headers: { Authorization: 'Bearer ' + token } });
    setExpenses(res.data);
    const map = {};
    res.data.forEach(e=> map[e.category] = (map[e.category]||0) + e.amount);
    const arr = Object.keys(map).map(k=> ({ name:k, value: map[k] }));
    setSummary(arr);
  }

  useEffect(()=> { fetch(); }, []);

  // --- Creative UI/UX changes start here ---
  
  // We'll use a component for the KPI Card (Total Metrics)
  const TotalMetricsCard = () => (
    <div style={{
        padding: '20px', 
        backgroundColor: '#334155', // Darker card background
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        color: '#F1F5F9', // Light text
        textAlign: 'center'
    }}>
        <p style={{fontSize: '14px', margin: '0 0 5px 0', opacity: 0.7}}>Total Spending (All Time)</p>
        <h2 style={{fontSize: '36px', margin: 0, color: '#FCD34D'}}>₹{totalSpending.toLocaleString('en-IN')}</h2> {/* Highlighted total */}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1E293B', // Main background color (Dark Navy)
      color: '#F1F5F9', // Default text color
      padding: '20px',
    }}>
      <div style={{maxWidth: 1200, margin:'0 auto'}}>
        <h1 style={{color: '#93C5FD', borderBottom: '2px solid #334155', paddingBottom: '10px', marginBottom: '20px'}}>
            AI Finance Tracker 🚀
        </h1>

        {/* TOP SECTION: Input and Metrics */}
        <div style={{display:'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20}}>
            
            {/* Input Card */}
            <div style={{
                padding: '20px', 
                backgroundColor: '#334155', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
                <h3 style={{marginTop: 0, color: '#94A3B8'}}>Record New Expense</h3>
                <ExpenseForm onAdded={fetch} /> 
            </div>

            {/* Total Metrics Card */}
            <TotalMetricsCard />
        </div>

        {/* MIDDLE/BOTTOM SECTION: Chart and List */}
        <div style={{display:'flex', gap: 20}}>
            
            {/* Expense List (now takes up majority of the space) */}
            <div style={{flex: 2, 
                padding: '20px', 
                backgroundColor: '#334155', 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
                <h3 style={{marginTop: 0, color: '#94A3B8'}}>Recent Transactions</h3>
                {/* Note: You may need to style ExpenseList and its contents (the table) to match the dark theme */}
                <ExpenseList expenses={expenses} refresh={fetch} /> 
            </div>
            
            {/* Chart Card */}
            <div style={{flex: 1, 
                padding: '20px', 
                backgroundColor: '#334155', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                minWidth: '350px' // Ensure chart area has minimum space
            }}>
                <h3 style={{marginTop: 0, color: '#94A3B8'}}>Spending by Category</h3>
                
                {/* ResponsiveContainer helps the chart fit the new card */}
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie 
                          data={summary} 
                          dataKey="value" 
                          nameKey="name" 
                          cx="50%" cy="50%" 
                          outerRadius={100} 
                          fill="#8884d8" 
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Improved label
                      >
                        {summary.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                          contentStyle={{ background: '#1E293B', border: '1px solid #334155' }} 
                          formatter={(value, name) => [`₹${value.toLocaleString('en-IN')}`, name]}
                      />
                      <Legend />
                    </PieChart>
                </ResponsiveContainer>
                
            </div>
        </div>
      </div>
    </div>
  );
}