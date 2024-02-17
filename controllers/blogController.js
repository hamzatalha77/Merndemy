import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Blog from '../models/blogModel.js'

// const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 10
//   const page = Number(req.query.pageNumber) || 1
//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i'
//         }
//       }
//     : {}
//   const count = await Product.countDocuments({ ...keyword })
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))
//   res.json({ products, page, pages: Math.ceil(count / pageSize) })
// })

// const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id)
//   if (product) {
//     res.json(product)
//   } else {
//     res.status(404)
//     throw new Error('product not found')
//   }
// })
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id)
//   if (product) {
//     await product.remove()
//     res.json({ message: 'product remove' })
//   } else {
//     res.status(404)
//     throw new Error('product not found')
//   }
// })
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, images } = req.body

    const blog = new Blog({
      title,
      images
    })

    const slug = slugify(title, { lower: true })
    blog.slug = slug

    let createdBlog = await blog.save()

    createdBlog = createdBlog.toObject()
    createdBlog.createdAt = createdBlog.createdAt.toLocaleString()
    createdBlog.updatedAt = createdBlog.updatedAt.toLocaleString()

    res.status(201).json(createdBlog)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

const updateBlog = asyncHandler(async (req, res) => {
  const { title, images } = req.body

  let blog = await Blog.findById(req.params.id)

  if (blog) {
    blog.title = title

    if (images) {
      blog.images = images
    }

    const slug = slugify(title, { lower: true })
    blog.slug = slug

    blog.updatedAt = new Date()

    blog = await blog.save()

    blog = blog.toObject()
    blog.createdAt = blog.createdAt.toLocaleString()
    blog.updatedAt = blog.updatedAt.toLocaleString()

    res.json(blog)
  } else {
    res.status(404)
    throw new Error('Blog Not Found')
  }
})
export {
  //   getProducts,
  //   getProductById,
  //   deleteProduct,
  //   createProduct,
  //   updateProduct,
  updateBlog,
  createBlog
}
