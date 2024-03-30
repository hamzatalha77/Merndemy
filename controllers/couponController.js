import asyncHandler from 'express-async-handler'
import Coupon from '../models/couponModel.js'
import User from '../models/userModel.js'

const createCoupon = asyncHandler(async (req, res) => {
  const { startDate, endDate, thresholdAmount, isActive, percent, code } =
    req.body

  if (
    !startDate ||
    !endDate ||
    !thresholdAmount ||
    !isActive ||
    !percent ||
    !code
  ) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }

  try {
    const newCoupon = new Coupon({
      startDate,
      endDate,
      thresholdAmount,
      isActive,
      percent,
      code
    })

    const createdCoupon = await newCoupon.save()

    res.status(201).json(createdCoupon)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Coupon creation failed', error: error.message })
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

const applyCoupon = asyncHandler(async (req, res) => {
  // const { _id } = req.user
  const { code } = req.body
  if (!code) {
    throw new Error('Coupon code is required')
  }
  // const user = await User.findOne({ _id })
  const foundCoupon = await Coupon.findOne({ code }) // Rename variable to avoid conflict

  if (!foundCoupon) {
    throw new Error('Invalid coupon code')
  }
  if (!foundCoupon.isActive) {
    throw new Error('This coupon is no longer available')
  }

  const currentDate = new Date()
  if (
    foundCoupon.startDate > currentDate ||
    foundCoupon.endDate < currentDate
  ) {
    throw new Error('This coupon is not valid at the moment')
  }
  res.status(200).json({ message: 'Coupon code is valid' })
})

export { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, applyCoupon }
