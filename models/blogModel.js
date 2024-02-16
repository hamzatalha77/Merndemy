import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String
    },
    images: [{ type: String }]
  },
  { timestamps: true }
)
const Blog = mongoose.model('Blog', blogSchema)
export default Blog
