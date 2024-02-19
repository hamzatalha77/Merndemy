import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    slug: {
      type: String
    },
    images: [{ type: String, required: true }]
  },
  { timestamps: true }
)
const Blog = mongoose.model('Blog', blogSchema)
export default Blog
