const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const csurf = require('csurf');
const { body,validationResult } = require('express-validator');


const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index',{ csrfToken: req.csrfToken() });
});


app.get('/logout', (req, res) => {
  // Clear the session on logout
  req.session.destroy((err) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error during logout');
      } else {
          res.redirect('/');
      }
  });
});

// Validation and Sanitization

const baseUsernameChain = () => body('username').notEmpty().isLength({min : 5}).escape();
const basePasswordChain = () => body('password').notEmpty();

// app.post('/login',[body('username').isLength({min : 3}).escape() , body('password').escape()] , (req, res) => {
app.post('/login',[baseUsernameChain(),basePasswordChain()] , (req, res) => {
  // Validate and authenticate the user
  const result = validationResult(req);
  if(!result.isEmpty()){
    return res.status(400).json({ errors: result.array() });
  }
  // Implement appropriate validation and secure authentication mechanisms here
  // For simplicity, you can use a hardcoded username and password for demonstration purposes

  const { username, password } = req.body;

  if (username == 'admin' && password === 'password') {
    // console.log(req.session.isAuthenticated);
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } else {
    res.render('alert');
    // res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

app.use((req, res, next) => {
  res.status(404).send('Not found');
});

app.use((err, req, res, next) => {
  // console.log(err);
  //handle the csrs token error
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send('Invalid CSRF token');
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
