import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      trim: true,
      required: [true, 'Please add a category Name']
    },
    slugCategory: {
      type: String,
      unique: true
    },
    imageCategory: {
      type: String,
      required: [true, 'Please add a category Image']
    }
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)
export default Category
