import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    blogSlug: {
      type: String,
      unique: true
    },
    images: [{ type: String, required: true }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ]
  },
  { timestamps: true }
)
const Blog = mongoose.model('Blog', blogSchema)
export default Blog
