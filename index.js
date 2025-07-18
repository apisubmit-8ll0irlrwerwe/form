const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Allow all origins (or replace with your specific frontend URL for security)
app.use(cors({
  origin: '*', // Or: 'https://test-link-alpha.vercel.app'
}));

app.use(express.json());

// Example POST handler
app.post('/pass', (req, res) => {
  console.log('Received password:', req.body.password);
  res.status(200).json({ message: 'Password received' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
