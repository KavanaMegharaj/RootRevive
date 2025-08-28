import express from 'express';
import Product from '../models/Product.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/products?search=&min=&max=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { search = '', min = 0, max = Number.MAX_SAFE_INTEGER, page = 1, limit = 12, category } = req.query;
    const query = {
      $and: [
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ]
        },
        { price: { $gte: Number(min), $lte: Number(max) } }
      ]
    };
    if (category) query.$and.push({ category });
    const skip = (Number(page) - 1) * Number(limit);
    const [items, count] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments(query)
    ]);
    res.json({ items, total: count, page: Number(page), pages: Math.ceil(count / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin create
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;
    const product = await Product.create({ name, description, price, stock, image, category });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin update
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin delete
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
