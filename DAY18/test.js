const express = require('express');
const app = express();

// Logging Middleware
const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// Error Handling Middleware
const errorHandlingMiddleware = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};

app.use(loggingMiddleware);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route intentionally causing an error (non-existent route)
app.get('/nonexistent', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

app.use(errorHandlingMiddleware);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
