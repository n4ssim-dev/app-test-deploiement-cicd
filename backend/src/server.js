require('dotenv').config();
const express = require('express');
const cors = require('cors');
const users = require('./data/users.json');
const { getTrainingInfo } = require('./services/info.service');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Accepte les requêtes sans origine (curl, Postman, appels serveur à serveur)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origine non autorisée par CORS : ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    candidate => candidate.username === username && candidate.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Identifiants incorrects'
    });
  }

  // Faux token volontairement prédictible et aucune protection des données retournées.
  return res.json({
    success: true,
    token: `demo-token-${user.id}`,
    user
  });
});

app.get('/api/info', (req, res) => {
  const info = getTrainingInfo();

  res.json({
    ...info,
    servedAt: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Backend démarré sur le port :${PORT}`);
});
