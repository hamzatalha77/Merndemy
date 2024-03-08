import mongoose from 'mongoose'

const subCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      required: true
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
