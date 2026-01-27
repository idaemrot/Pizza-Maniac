import { Router, Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { protect, authorize } from '../middleware/auth';
import { z } from 'zod';
import mongoose from 'mongoose';

const router = Router();

const orderStatusSchema = z.object({
  status: z.enum(['NEW', 'PROCESSING', 'DELIVERED']),
});

// @route   POST /api/orders
// @desc    Place a new order from cart
// @access  Private (User)
router.post('/', protect, authorize(['User', 'Admin']), async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Check product availability and update stock
    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product?.name || 'a product'}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      userId,
      products: cart.products,
      totalAmount: cart.totalAmount,
      status: 'NEW',
      createdAt: new Date(),
    });

    await newOrder.save();

    // Clear the cart after placing the order
    cart.products = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/orders
// @desc    Get all orders (Admin) or user's orders (User)
// @access  Private (User, Admin)
router.get('/', protect, authorize(['User', 'Admin']), async (req: Request, res: Response) => {
  try {
    if (req.user?.role === 'Admin') {
      const orders = await Order.find({}).populate('userId', 'name email').populate('products.productId', 'name price');
      res.json(orders);
    } else {
      const orders = await Order.find({ userId: req.user?.userId }).populate('products.productId', 'name price');
      res.json(orders);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Private (Admin only)
router.put('/:id', protect, authorize(['Admin']), async (req: Request, res: Response) => {
  try {
    const validatedData = orderStatusSchema.parse(req.body);
    const { status } = validatedData;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;