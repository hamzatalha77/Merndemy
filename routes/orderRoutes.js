import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  deleteOrder
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleWare.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id').delete(protect, admin, deleteOrder)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myorders/:id').delete(protect, deleteOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
