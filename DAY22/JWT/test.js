const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const csurf = require('csurf');
const { body,validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());


const USERS = [
  {
    username: "ismail",
    password: "supersecret",
  },
  {
    username: "someuser",
    password: "user",
  },
];


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));


function isAuthtenticated(req, res, next) {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  // Bearer token
  const token = authHeader.split(" ")[1];
  console.log(token)
    // console.log(token)
    if(!token) {
        return res.status(401).json({ message: "Unauthenticated" });
    }
    const user = jwt.verify(token, "secret");
    if(!user) {
        return res.status(403).json({ message: "Unauthenticated" });
    }
    req.user = user;
    next();
}


// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
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

const sanitizeUserInput = (input) => {
  // Implement sanitization logic here
  // For example, you can use regular expressions to remove or sanitize special characters
  return input.replace(/[^a-zA-Z0-9]/g, ''); // Example: Remove all non-alphanumeric characters
};


const baseUsernameChain = () => body('username').notEmpty().isLength({min : 3}).escape().customSanitizer(sanitizeUserInput);
const basePasswordChain = () => body('password').notEmpty().customSanitizer(sanitizeUserInput);


app.post('/login',[baseUsernameChain(),basePasswordChain()] , (req, res) => {

  const result = validationResult(req);
  if(!result.isEmpty()){

    return res.status(400).json({ errors: result.array() });
  }


  const { username, password } = req.body;
  const user = USERS.find((user)=>user.username === username );
  if(!user){
    res.render('alertUsername');
  }
  if(user.password !== password){
    res.render('alertpassword');
  }



  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '2h' });

  req.session.isAuthenticated = true;
  res.redirect('/dashboard');

});



app.get('/dashboard' , (req, res) => {
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

  //handle the csrs token error
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send('Invalid CSRF token');
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
