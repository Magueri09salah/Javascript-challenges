// Secured Node.js and Express server against XSS
const express = require('express');
// const escapeHtml = require('escape-html');
const { body , validationResult } = require('express-validator');
const app = express();

app.post('/hey', body('username').isEmpty().escape(), function(req, res){

    const result = validationResult(req);
    if(result.isEmpty()){
        return res.send(`<html><body><h1>${req.body.search_query}</h1></body></html> `);
    }
    res.send({errors : result.array()});

});

app.listen(3000, () => console.log('Server running on port 3000'));
