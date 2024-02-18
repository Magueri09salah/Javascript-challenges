const http = require('http');

const { main , displayWeather, fetchdataTemperature, randomCity } = require('../DAY14/test');


const server = http.createServer((req, res) => {
    // Request handling logic goes here
    const url = require('url');

// Inside the request handler
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;
const query = parsedUrl.query;
if (path === '/users') {
    // Handle the '/users' endpoint
  } else if (path === '/weather') {
    // Handle the '/products' endpoint
    // Inside the "/products" endpoint handler
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end(main());
  } else {
    // Handle unknown endpoints
  }
  });

  server.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
