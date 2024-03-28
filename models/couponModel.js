import mongoose from 'mongoose'

const couponSchema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  thresholdAmount: Number,
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  }
})

const coupon = mongoose.model('Coupon', couponSchema)
export default coupon
