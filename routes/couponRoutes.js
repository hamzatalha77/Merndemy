import express from 'express'
const router = express.Router()
import {
  applyCoupon,
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon
} from '../controllers/couponController.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

router
  .route('/')
  .post(protect, admin, createCoupon)
  .get(protect, admin, getAllCoupons)
router
  .route('/:id')
  .put(protect, admin, updateCoupon)
  .delete(protect, admin, deleteCoupon)
router.route('/applyCoupon').post(protect, applyCoupon)
export default router
