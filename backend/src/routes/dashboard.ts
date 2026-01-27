import { Router, Request, Response } from 'express';
import Order from '../models/Order';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/stats', protect, authorize(['Admin']), async (req: Request, res: Response) => {
  try {
    const totalOrders = await Order.countDocuments();
    const newOrders = await Order.countDocuments({ status: 'NEW' });
    const processingOrders = await Order.countDocuments({ status: 'PROCESSING' });
    const deliveredOrders = await Order.countDocuments({ status: 'DELIVERED' });

    const revenueResult = await Order.aggregate([
      {
        $match: { status: 'DELIVERED' }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    const revenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
      totalOrders,
      new: newOrders,
      processing: processingOrders,
      delivered: deliveredOrders,
      revenue,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;