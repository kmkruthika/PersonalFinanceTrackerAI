
# AI Finance Tracker - Server

## Setup
1. Copy `.env.example` to `.env` and update values.
2. `cd server`
3. `npm install`
4. `npm run dev`

## Notes
- This server uses the `natural` npm package for a simple Naive Bayes classifier that auto-categorizes expenses
  and supports incremental retraining when the user corrects categories.
- Replace MONGO_URI with your MongoDB connection string.
