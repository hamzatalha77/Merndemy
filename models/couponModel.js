import mongoose from 'mongoose'

const couponSchema = mongoose.Schema({
  startDate: { type: Date },
  endDate: { type: Date },
  thresholdAmount: { type: Number },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  percent: {
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
