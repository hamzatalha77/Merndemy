import express from 'express'
const router = express.Router()
import { createCoupon } from '../controllers/couponController.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

router.route('/').post(protect, admin, createCoupon)

export default router
