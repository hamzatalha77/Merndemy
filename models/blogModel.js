import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    title: {
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
