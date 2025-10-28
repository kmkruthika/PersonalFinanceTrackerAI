
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const ai = require('../ai/classifier');

// Create expense (AI auto-categorizes by description)
router.post('/', auth, async (req, res) => {
  try {
    const { amount, description, date, notes } = req.body;
    const category = ai.categorize(description || notes || '');
    const exp = new Expense({ user: req.userId, amount, description, date, notes, category });
    await exp.save();
    res.json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// List expenses for user
router.get('/', auth, async (req, res) => {
  const items = await Expense.find({ user: req.userId }).sort({ date: -1 }).limit(1000);
  res.json(items);
});

// Update expense (and allow re-categorization)
router.put('/:id', auth, async (req, res) => {
  try {
    const { amount, description, date, notes, category } = req.body;
    const exp = await Expense.findOne({ _id: req.params.id, user: req.userId });
    if (!exp) return res.status(404).json({ error: 'Not found' });
    exp.amount = amount ?? exp.amount;
    exp.description = description ?? exp.description;
    exp.date = date ?? exp.date;
    exp.notes = notes ?? exp.notes;
    if (category) exp.category = category;
    await exp.save();
    res.json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// Retrain AI with corrected labels
router.post('/retrain', auth, async (req, res) => {
  try {
    // receive array of { text, category } pairs
    const pairs = req.body.pairs || [];
    ai.retrain(pairs);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Retrain failed' });
  }
});

module.exports = router;
