
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now },
  category: String,
  notes: String
});

module.exports = mongoose.model('Expense', expenseSchema);
