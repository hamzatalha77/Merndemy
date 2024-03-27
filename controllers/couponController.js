import asyncHandler from 'express-async-handler'
import Coupon from '../models/couponModel'

const createCoupon = asyncHandler(async (req, res, next) => {
  try {
    const newCoupon = await Coupon.create(req.body)
    res.json(newCoupon)
  } catch (error) {
    next(error)
  }
})
export { createCoupon }
