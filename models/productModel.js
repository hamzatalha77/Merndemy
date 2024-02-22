import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String
    },
    images: [{ type: String, required: true }],

    brand: {
      type: String
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category']
    },
    description: {
      type: String
    },
    slug: {
      type: String
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number
    },
    countInStock: {
      type: Number,

      default: 0
    }
  },
  { timestamps: true }
)
const Product = mongoose.model('Product', productSchema)
export default Product
