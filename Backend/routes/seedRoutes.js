import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js'; // Assuming `data` is imported from a file where `products` is defined.

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.deleteMany({});  // Use deleteMany instead of remove
    const createdProducts = await Product.insertMany(data.products);
    res.status(201).json({ message: 'Products seeded successfully', createdProducts });
});

export default seedRouter;
