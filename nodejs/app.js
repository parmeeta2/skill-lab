// app.js

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const validationMiddleware = require('./middleware/validationMiddleware');

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON requests
app.use(authenticationMiddleware); // Application-level middleware for authentication

// Routes
app.use('/auth', authRoutes); // Auth routes
app.use('/blogs', blogRoutes); // Blog routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// authenticationMiddleware.js

const authenticationMiddleware = (req, res, next) => {
    // Implement your authentication logic here
    // For example, check for a valid JWT token in the request header
    
    // If authentication fails, return an error response
    if (!req.headers.authorization || !isValidToken(req.headers.authorization)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // If authentication succeeds, continue to the next middleware
    next();
  };
  
  module.exports = authenticationMiddleware;

  

// validationMiddleware.js

const validationMiddleware = (req, res, next) => {
    // Implement your validation logic here
    // For example, check if required fields are present in the request body
  
    // If validation fails, return an error response
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    // If validation succeeds, continue to the next middleware
    next();
  };
  
  module.exports = validationMiddleware;
  





