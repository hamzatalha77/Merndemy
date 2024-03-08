import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      trim: true,
      required: [true, 'Please add a category Name']
    }
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)
export default Category
