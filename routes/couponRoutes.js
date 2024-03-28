import express from 'express'
const router = express.Router()
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon
} from '../controllers/couponController.js'
import { admin, protect } from '../middleware/authMiddleWare.js'
import verifyCoupon from '../controllers/verifyCoupon.js'

router.post('/verifyCoupon', async (req, res) => {
  res.send(await verifyCoupon(req.body))
})
router
  .route('/')
  .post(protect, admin, createCoupon)
  .get(protect, admin, getAllCoupons)
router
  .route('/:id')
  .put(protect, admin, updateCoupon)
  .delete(protect, admin, deleteCoupon)

export default router
