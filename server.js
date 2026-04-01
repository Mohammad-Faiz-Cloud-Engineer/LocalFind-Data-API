/**
 * LocalFind Data API Server
 * 
 * @author Mohammad Faiz
 * @license BSD-2-Clause
 * @repository https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API
 */

const express = require('express');
const cors = require('cors');
const { getBusinesses, getBusinessById, getBusinessesByCategory, searchBusinesses, getCategories, getStats } = require('./api/controllers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LocalFind Data API',
    version: '1.0.0',
    author: 'Mohammad Faiz',
    repository: 'https://github.com/Mohammad-Faiz-Cloud-Engineer/LocalFind-Data-API',
    license: 'BSD-2-Clause',
    endpoints: {
      '/api/businesses': 'Get all businesses with optional filters',
      '/api/businesses/:id': 'Get a specific business by ID',
      '/api/categories': 'Get all available categories',
      '/api/categories/:slug': 'Get businesses by category slug',
      '/api/search': 'Search businesses by name, tags, or description',
      '/api/stats': 'Get API statistics',
      '/api/health': 'Health check endpoint'
    }
  });
});

// API Routes
app.get('/api/businesses', getBusinesses);
app.get('/api/businesses/:id', getBusinessById);
app.get('/api/categories', getCategories);
app.get('/api/categories/:slug', getBusinessesByCategory);
app.get('/api/search', searchBusinesses);
app.get('/api/stats', getStats);
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server - bind to 0.0.0.0 for Docker/HuggingFace Spaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║         LocalFind Data API Server                         ║
║                                                           ║
║  Server running on: http://0.0.0.0:${PORT}                ║
║  Author: Mohammad Faiz                                    ║
║  License: BSD-2-Clause                                    ║
║                                                           ║
║  API Endpoints:                                           ║
║  - GET /api/businesses                                    ║
║  - GET /api/businesses/:id                                ║
║  - GET /api/categories                                    ║
║  - GET /api/categories/:slug                              ║
║  - GET /api/search?q=query                                ║
║  - GET /api/stats                                         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
