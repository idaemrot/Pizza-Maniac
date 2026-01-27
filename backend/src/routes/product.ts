import { Router, Request, Response } from 'express';
import Product from '../models/Product';
import { protect, authorize } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

const productSchema = z.object({
  category: z.enum(['Pizza', 'Drink']),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  stock: z.number().min(0, 'Stock must be non-negative'),
  isAvailable: z.boolean().default(true),
});

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/products
// @desc    Add a new product
// @access  Admin only
router.post('/', protect, authorize(['Admin']), async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);
    const newProduct = new Product(validatedData);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Admin only
router.put('/:id', protect, authorize(['Admin']), async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.partial().parse(req.body); // Allow partial updates
    const product = await Product.findByIdAndUpdate(req.params.id, validatedData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;