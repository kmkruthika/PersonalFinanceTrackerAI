
import React from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function ExpenseList({ expenses, refresh }){
  const token = localStorage.getItem('token');
  return (
    <div>
      <h3>Recent expenses</h3>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead><tr><th>Date</th><th>Desc</th><th>Category</th><th>Amount</th></tr></thead>
        <tbody>
          {expenses.map(e=> (
            <tr key={e._id} style={{borderTop:'1px solid #eee'}}>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>{e.description || e.notes}</td>
              <td>{e.category}</td>
              <td>₹{e.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
