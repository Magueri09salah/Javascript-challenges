const express = require('express');

const app = express();



app.get('/', (req,res)=>{
    res.send("Welcome to my Express.js server!");
})

app.get('/users/:id', (req,res) => {
    const id = req.params.id;
   res.send(id);
})

app.post('/users', (req, res) => {
    res.send('User created successfully!');
  });

  app.put('/users/:id', (req, res) => {
    res.send(`User with ID ${req.params.id} updated successfully!`);
  });

  app.delete('/users/:id', (req, res) => {
    res.send(`User with ID ${req.params.id} deleted successfully!`);
  });

  app.post('/login', (req, res) => {
    res.send('Login Successful');
  });

  app.get('/success', (req, res) => {
    res.status(200).send('Success');
  });

  app.get('/notfound', (req, res) => {
    res.status(404).send('Not Found');
  });

app.listen(3000, ()=>{
    console.log(`server is running`);
})
