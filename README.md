# Competitive Intelligence & Battlecard Generator

AI-powered system that generates battlecards and compares companies using real-time data from Tavily, GNews, and Groq LLM.

## Features

- **Battlecard Generator**: Generate comprehensive battlecards for single companies
- **Company Comparison**: Compare two companies across multiple dimensions
- **Real-time Data**: Integrates Tavily (search) and GNews (news) APIs
- **AI-Powered**: Uses Groq API with LLaMA3 for structured insights
- **Dark Mode UI**: Modern dark-themed interface built with React + Tailwind
- **PDF Export**: Download battlecards as PDF
- **Caching**: In-memory caching to avoid recomputation

## Tech Stack

### Backend (Render)
- Node.js + Express
- Groq SDK for LLM processing
- Axios for API calls
- Puppeteer for PDF generation

### Frontend (Vercel)
- React (Vite)
- Tailwind CSS with dark mode
- Axios for API communication
- Marked for Markdown rendering

## Prerequisites

- Node.js 18+ installed
- Groq API key ([console.groq.com](https://console.groq.com))
- Tavily API key ([tavily.com](https://tavily.com))
- GNews API key ([gnews.io](https://gnews.io))

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd KnowCompany
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file from example:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```
GROQ_API_KEY=your_groq_api_key_here
SEARCH_API_KEY=your_tavily_api_key_here
NEWS_API_KEY=your_gnews_api_key_here
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

Backend runs on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### POST `/api/generate`

Generate a battlecard for a single company.

**Request:**
```json
{
  "competitor": "Stripe"
}
```

**Response:**
```json
{
  "competitor": "Stripe",
  "markdown": "# Stripe Battlecard...",
  "extractedData": { ... },
  "sources": [ ... ],
  "generatedAt": "2026-05-02T..."
}
```

### POST `/api/compare`

Compare two companies.

**Request:**
```json
{
  "companyA": "Stripe",
  "companyB": "Razorpay"
}
```

**Response:**
```json
{
  "companyA": "Stripe",
  "companyB": "Razorpay",
  "comparison": { ... },
  "markdown": "# Stripe vs Razorpay...",
  "sources": [ ... ],
  "generatedAt": "2026-05-02T..."
}
```

### POST `/api/generate-pdf`

Generate PDF from Markdown.

**Request:**
```json
{
  "markdown": "# Battlecard..."
}
```

**Response:** PDF file download

### GET `/health`

Health check endpoint.

## Deployment

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && node server.js`
6. Add environment variables in Render dashboard

### Frontend (Vercel)

1. Push code to GitHub
2. Import project on Vercel
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy

## Project Structure

```
KnowCompany/
├── backend/
│   ├── controllers/
│   │   ├── battlecardController.js
│   │   └── compareController.js
│   ├── services/
│   │   ├── battlecardService.js
│   │   └── compareService.js
│   ├── routes/
│   │   ├── battlecard.js
│   │   ├── compare.js
│   │   └── pdf.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── groq.js
│   │   └── pdf.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BattlecardForm.jsx
│   │   │   ├── CompareForm.jsx
│   │   │   ├── ResultView.jsx
│   │   │   └── Loader.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```

## Performance Optimizations

- In-memory caching for battlecards (1-hour TTL)
- Comparison reuses cached battlecard data
- Parallel API calls using Promise.all
- Limited search results to top 5 for speed
- Response time target: < 60 seconds

## Error Handling

- Graceful fallback to Tavily if GNews fails
- API limit error handling
- Invalid input validation
- Cache miss handling with fresh data generation

## License

MIT
