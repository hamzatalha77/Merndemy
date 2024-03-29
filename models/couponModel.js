import mongoose from 'mongoose'

const couponSchema = mongoose.Schema({
  startDate: { type: Date },
  endDate: { type: Date },
  thresholdAmount: { type: Number },
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
