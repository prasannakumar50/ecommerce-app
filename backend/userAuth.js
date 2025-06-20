const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_jwt_secret";
const users = []; // In-memory user store

const app = express();
app.use(cors());
app.use(express.json());

// Register endpoint
app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  users.push({ email, password, name });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, name: user.name, email: user.email });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`User auth server running on port ${PORT}`);
});

module.exports = app; 