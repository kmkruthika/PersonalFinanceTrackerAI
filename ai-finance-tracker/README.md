
# AI-Powered Personal Finance Tracker (MERN)

This project is a minimal, opinionated MERN stack app with a simple AI component for auto-categorizing expenses using a Naive Bayes classifier (via the `natural` npm package).

Folders:
- server/ - Node/Express backend (classifier, APIs, MongoDB models)
- client/ - Vite + React frontend

Quick start (developer):
1. Start MongoDB (or use a cloud Mongo URI)
2. In `server`: copy `.env.example` -> `.env`, set MONGO_URI, then `npm install` and `npm run dev`
3. In `client`: copy `.env.example` -> `.env`, then `npm install` and `npm run dev`
4. Open frontend (default Vite port 5173) and use the app

AI features:
- Auto-categorize expenses on creation based on description/notes
- Retrain classifier via an API endpoint when users correct categories (the client UI can be extended to call it)
- Classifier persists to `server/ai/classifier.json`

This zip is generated for you. Customize, extend, and push to your GitHub repo!
