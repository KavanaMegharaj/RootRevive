import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// Place order
router.post('/', protect, async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items' });
    }
    if (!address) return res.status(400).json({ message: 'Address required' });

    // Fetch products and validate stock
    const ids = items.map(it => it.product);
    const products = await Product.find({ _id: { $in: ids } });
    const map = new Map(products.map(p => [String(p._id), p]));

    for (const it of items) {
      const p = map.get(String(it.product));
      if (!p) return res.status(400).json({ message: 'Product not found: ' + it.product });
      if (p.stock < it.qty) return res.status(400).json({ message: `Insufficient stock for ${p.name}` });
    }

    // Calculate total and prepare order items with snapshot
    let total = 0;
    const orderItems = items.map(it => {
      const p = map.get(String(it.product));
      const line = p.price * it.qty;
      total += line;
      return { product: p._id, name: p.name, price: p.price, qty: it.qty };
    });

    // Decrement stock atomically-ish (simple loop; for production use transactions)
    for (const it of items) {
      await Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty } });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      address,
      total
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// My orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: all orders
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update status
router.patch('/:id/status', protect, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
