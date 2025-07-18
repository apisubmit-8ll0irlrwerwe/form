const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST route for /submit
app.post('/submit', (req, res) => {
  const { c_user, xs } = req.body;

  console.log("Received data:", { c_user, xs });

  // You can process or store the data here
  res.status(200).json({ success: true, message: "Data received successfully." });
});

// GET route for /
app.get('/', (req, res) => {
  res.send('✅ Server is running. Use POST /submit to send data.');
});

// Export the app for Vercel
module.exports = app;
