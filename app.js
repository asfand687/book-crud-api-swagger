const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book CRUD API',
      version: '1.0.0',
      description: 'API for managing books',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
