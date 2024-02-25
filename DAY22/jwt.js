const express = require('express');
const app = express();

// Jwt
const jwt = require('jsonwebtoken');
app.use(express.json());


app.post('/login' , (req,res)=> {
  const user = {id : 123};
  const token = jwt.sign({user : user.id} , 'secret-key', {expiresIn : '1h'});
    res.json({token});
})

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

  app.get('/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, data) => {
      
      // console.log(req.token);
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({ data });
      }
    });
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
