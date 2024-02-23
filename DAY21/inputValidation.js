// Input Validation and Sanitization Examples in Node.js and Express

// Insecure Code Version:

// Node.js and Express server code demonstrating unsafe data handling for database interaction
// const express = require('express');
// const app = express();

// // Simulated database object
// let database = {};

// // Middleware to parse request body
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

// app.post('/register', (req, res) => {
//   // User input is directly assigned without validation or sanitization
//   let username = req.body.username;
//   let email = req.body.email;

//   // Simulating saving data to a 'database'
//   database[email] = { email: email };

//   res.send(`User ${username} registered with email ${email}`);
// });

// app.listen(3000, () => console.log('Server running on port 3000'));


// Secured Node.js and Express server with input validation and sanitization
const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');

// Simulated database object
let database = {};

app.post('/submit-form',
  body('username').trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // User input is validated and sanitized
    let username = req.body.username;
    let email = req.body.email;

    // Simulating saving data to a 'database'
    database[email] = { email };
    database[username] = { username};
    res.send(`User ${username} registered with email ${email}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
