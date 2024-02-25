const express = require('express');
const bodyParser = require('body-parser'); //   for parsing incoming request bodies.
const cookieParser = require('cookie-parser'); //  for parsing cookies from the request headers.
const session = require('express-session'); // for managing user sessions
const csrf = require('csurf'); // Adding CSRF protection
const { sanitizeBody } = require('express-validator'); // Adding input sanitization
const { body, validationResult } = require('express-validator'); // Adding input validation

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));//  Middleware to parse URL-encoded form data.
app.use(cookieParser());//  Middleware to parse cookies from the request headers.
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })); // Middleware to manage user sessions with a secret key.


// CSRF protection
const csrfProtection = csrf({ cookie: true });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Sample Secure Node.js Application');
});

// Login route with input validation and sanitization
app.get('/login', csrfProtection, (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <input type="hidden" name="_csrf" value="${req.csrfToken()}">
      <button type="submit">Login</button>
    </form>
  `);
});

// Enhanced login route with input validation and sanitization
app.post('/login', csrfProtection, [
  body('username').trim().escape().notEmpty().isAlphanumeric(), // Validate and sanitize username
  body('password').escape().notEmpty(), // Sanitize password (escaping only)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  // Authenticate user (vulnerable code for the challenge)
  if (username === 'admin' && password === 'password') {
    req.session.authenticated = true;
    res.redirect('/profile');
  } else {
    res.send('Invalid username or password');
  }
});

// Profile route with CSRF protection
app.get('/profile', csrfProtection, (req, res) => {
  if (req.session.authenticated) {
    res.send(`<h1>Welcome to your profile, ${req.session.username}</h1>`);
  } else {
    res.redirect('/login');
  }
});

// Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
