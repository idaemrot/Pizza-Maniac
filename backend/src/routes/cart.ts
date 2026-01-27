import { Router, Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { protect, authorize } from '../middleware/auth';
import { z } from 'zod';
import mongoose from 'mongoose';

const router = Router();

const cartItemSchema = z.object({
  productId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), 'Invalid product ID'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private (User only)
router.get('/', protect, authorize(['User']), async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user?.userId }).populate('products.productId', 'name price');
    if (!cart) {
      return res.status(200).json({ userId: req.user?.userId, products: [], totalAmount: 0 });
    }
    res.json(cart);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private (User only)
router.post('/add', protect, authorize(['User']), async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = cartItemSchema.parse(req.body);

    const product = await Product.findById(productId);
    if (!product || !product.isAvailable || product.stock < quantity) {
      return res.status(400).json({ message: 'Product not available or insufficient stock' });
    }

    let cart = await Cart.findOne({ userId: req.user?.userId });

    if (!cart) {
      cart = new Cart({ userId: req.user?.userId, products: [], totalAmount: 0 });
    }

    const existingItemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cart.products[existingItemIndex].quantity += quantity;
      cart.products[existingItemIndex].price = product.price; // Ensure price is current
    } else {
      // Add new item
      cart.products.push({ productId: new mongoose.Types.ObjectId(productId), quantity, price: product.price });
    }

    // Recalculate total amount
    cart.totalAmount = cart.products.reduce((acc, item) => acc + item.quantity * item.price, 0);

    await cart.save();
    res.json(cart);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/cart/remove
// @desc    Remove item from cart or decrease quantity
// @access  Private (User only)
router.post('/remove', protect, authorize(['User']), async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = cartItemSchema.parse(req.body);

    let cart = await Cart.findOne({ userId: req.user?.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex > -1) {
      const item = cart.products[itemIndex];
      if (item.quantity <= quantity) {
        // Remove item completely
        cart.products.splice(itemIndex, 1);
      } else {
        // Decrease quantity
        item.quantity -= quantity;
      }
      cart.totalAmount = cart.products.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;