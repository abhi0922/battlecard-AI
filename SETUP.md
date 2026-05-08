# Quick Setup Guide

## 1. Get API Keys

- **Groq**: https://console.groq.com/keys (free tier available)
- **Tavily**: https://tavily.com (free tier: 1000 searches/month)
- **GNews**: https://gnews.io (free tier: 100 requests/day)

## 2. Configure Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your API keys
npm install
npm run dev
```

Backend runs on: http://localhost:3000

## 3. Configure Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## 4. Test

1. Open http://localhost:5173
2. Click "Battlecard" tab
3. Enter a company name (e.g., "Stripe")
4. Click "Generate Battlecard"
5. Wait up to 60 seconds for results

## Environment Variables

### Backend (.env)
```
GROQ_API_KEY=gsk_...
SEARCH_API_KEY=tvly-...
NEWS_API_KEY=...
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Deploy

### Backend to Render
1. Push to GitHub
2. Create Web Service on Render
3. Build: `cd backend && npm install`
4. Start: `cd backend && node server.js`
5. Add env vars in dashboard

### Frontend to Vercel
1. Import project on Vercel
2. Root dir: `frontend`
3. Add env var: `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy
