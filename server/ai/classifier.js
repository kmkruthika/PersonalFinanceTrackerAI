/*
Simple AI classifier using `natural` NaiveBayesClassifier.
- It ships with seed training data (common expense descriptions -> categories).
- When users correct the category, the client can call /retrain to incrementally train the model and save it.
- For persistence we use the built-in save/load methods from natural.
*/

const fs = require('fs');
const path = require('path');
const natural = require('natural');
const MODEL_PATH = path.join(__dirname, 'classifier.json');

let classifier = new natural.BayesClassifier();

const seedData = [
  ['coffee', 'Food & Drink'],
  ['latte', 'Food & Drink'],
  ['uber', 'Transport'],
  ['taxi', 'Transport'],
  ['bus', 'Transport'],
  ['groceries', 'Groceries'],
  ['walmart', 'Groceries'],
  ['rent', 'Housing'],
  ['salary', 'Income'],
  ['electricity', 'Utilities'],
  ['internet', 'Utilities'],
  ['movie', 'Entertainment'],
  ['netflix', 'Entertainment'],
  ['gym', 'Health'],
  ['doctor', 'Health'],
  ['flight', 'Travel'],
  ['hotel', 'Travel'],
  ['stationery', 'Office'],
  ['books', 'Education']
];

function trainSeed() {
  seedData.forEach(([text, label]) => classifier.addDocument(text, label));
  classifier.train();
  save();
}

function save() {
  // use classifier.save provided by natural
  classifier.save(MODEL_PATH, (err) => {
    if (err) console.error("Error saving model:", err);
    else console.log("AI model saved successfully");
  });
}

function load() {
  if (fs.existsSync(MODEL_PATH)) {
    try {
      natural.BayesClassifier.load(MODEL_PATH, null, (err, loaded) => {
        if (err) {
          console.error("Error loading model:", err);
        } else {
          classifier = loaded;
          console.log("Loaded saved AI model");
        }
      });
      return true;
    } catch (e) {
      console.error("Load failed:", e);
      return false;
    }
  }
  return false;
}

function categorize(text) {
  if (!text || typeof text !== 'string') return 'Uncategorized';
  try {
    const result = classifier.classify(text);
    return result || 'Uncategorized';
  } catch (e) {
    return 'Uncategorized';
  }
}

function retrain(pairs) {
  // pairs: [{text, category}, ...]
  pairs.forEach(p => classifier.addDocument(p.text, p.category));
  classifier.train();
  save();
}

if (!load()) {
  trainSeed();
}

module.exports = { categorize, retrain, MODEL_PATH };
