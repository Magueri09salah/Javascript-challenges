const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Server Variable Structure
const users = [];

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  if (users.some(user => user.username === username)) {
    return res.status(400).send('User already exists');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user credentials
    users.push({ username, password: hashedPassword });

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Registration failed');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send('Invalid username or password');
  }

  // Create session
  req.session.userId = username;

  // Set cookie containing session identifier
  res.cookie('sessionId', req.sessionID, { httpOnly: true });

  res.send('Login successful');
});

// Protected route
app.get('/protected', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }

  res.send('Protected route accessed');
});

// Logout endpoint
app.post('/logout', (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }

    // Clear session cookie
    res.clearCookie('sessionId');

    res.send('Logout successful');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
