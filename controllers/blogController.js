import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Blog from '../models/blogModel.js'

const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    : {}
  const count = await Blog.countDocuments({ ...keyword })
  const blogs = await Blog.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ blogs, page, pages: Math.ceil(count / pageSize) })
})

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error('blog not found')
  }
})
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    await blog.remove()
    res.json({ message: 'blog has been removed' })
  } else {
    res.status(404)
    throw new Error('blog not found')
  }
})
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, images, content, likes, comments } = req.body

    const blog = new Blog({
      postedBy: req.user._id,
      title,
      content,
      images
    })

    const slug = slugify(title, { lower: true })
    blog.slug = slug

    const createdBlog = await blog.save()

    res.status(201).json(createdBlog)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

const updateBlog = asyncHandler(async (req, res) => {
  const { title, images, content } = req.body

  let blog = await Blog.findById(req.params.id)

  if (blog) {
    blog.title = title
    blog.content = content

    if (images) {
      blog.images = images
    }

    const slug = slugify(title, { lower: true })
    blog.slug = slug

    blog.updatedAt = new Date()

    blog = await blog.save()

    res.json({ message: 'blog has been updated with success', blog })
  } else {
    res.status(404)
    throw new Error('Blog Not Found')
  }
})

const addComment = asyncHandler(async (req, res, next) => {
  const { comment } = req.body
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } }
      },
      { new: true }
    )
    res.status(200).json({
      success: true,
      blog
    })
  } catch (error) {
    next(error)
  }
})
const addLike = asyncHandler(async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id }
      },
      { new: true }
    )
    res.status(200).json({
      success: true,
      blog
    })
  } catch (error) {
    next(error)
  }
})
const removeLike = asyncHandler(async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id }
      },
      { new: true }
    )
    res.status(200).json({
      success: true,
      blog
    })
  } catch (error) {
    next(error)
  }
})
export {
  updateBlog,
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
  addComment,
  addLike,
  removeLike
}
