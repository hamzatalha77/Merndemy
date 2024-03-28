import asyncHandler from 'express-async-handler'
import Coupon from '../models/couponModel.js'

const createCoupon = asyncHandler(async (req, res, next) => {
  try {
    const newCoupon = await Coupon.create(req.body)
    res.json(newCoupon)
  } catch (error) {
    next(error)
  }
})

const getAllCoupons = asyncHandler(async (req, res, next) => {
  try {
    const Coupons = await Coupon.find()
    res.json(Coupons)
  } catch (error) {
    next(error)
  }
})
const updateCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.json(updatedCoupon)
  } catch (error) {
    next(error)
  }
})
const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id)
    res.json(deletedCoupon)
  } catch (error) {
    next(error)
  }
})
export { createCoupon, getAllCoupons, updateCoupon, deleteCoupon }
