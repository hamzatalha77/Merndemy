import asyncHandler from 'express-async-handler'

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
    const blog = new Blog({
      title: req.body.title,
      images: req.body.images
    })

    const createdBlog = await blog.save()
    res.status(201).json(createdBlog)
  } catch (error) {
    console.error(error) // Log the error for debugging
    res.status(400).send(error.message)
  }
})

// const updateProduct = asyncHandler(async (req, res) => {
//   const { name, price, description, image, brand, categories, countInStock } =
//     req.body

//   const product = await Product.findById(req.params.id)

//   if (product) {
//     product.name = name
//     product.price = price
//     product.description = description
//     product.image = image
//     product.brand = brand
//     product.categories = categories
//     product.countInStock = countInStock

//     const updatedProduct = await product.save()
//     res.json(updatedProduct)
//   } else {
//     res.status(404)
//     throw new Error('product Not Found')
//   }
// })

export {
  //   getProducts,
  //   getProductById,
  //   deleteProduct,
  //   createProduct,
  //   updateProduct,
  createBlog
}
