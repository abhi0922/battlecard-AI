const express = require('express');
const cors = require('cors');
require('dotenv').config();
const battlecardRoutes = require('./routes/battlecard');
const compareRoutes = require('./routes/compare');
const pdfRoutes = require('./routes/pdf');
const intelligenceRoutes = require('./routes/intelligence');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(s => s.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(null, true);
  }
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', battlecardRoutes);
app.use('/api', compareRoutes);
app.use('/api', pdfRoutes);
app.use('/api', intelligenceRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
