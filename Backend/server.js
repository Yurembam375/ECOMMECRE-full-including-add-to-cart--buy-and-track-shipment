import express from 'express';
import cors from 'cors';
import data from './data.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

// API endpoint to get products
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
