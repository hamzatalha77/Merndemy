import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema
const subCategorySchema = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: 'Category',
      required: [true, 'subCategory must belong to a category']
    },
    subCategory_name: {
      type: String,
      trim: true,
      required: [true, 'Please add a SubCategory Name']
    }
  },
  { timestamps: true }
)

const SubCategory = mongoose.model('SubCategory', subCategorySchema)
export default SubCategory
