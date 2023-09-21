import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  // throw new Error('someError')
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// const getProductsWithCat = asyncHandler(async (req, res) => {
//   let category = req.params.category

//   const products = await Product.find({ category: category })

//   res.json({ products })
// })
// const getProductsByCategory = asyncHandler(async (req, res) => {
//   const categoryName = req.path.replace(/\//g, '').replace('category', '')
//   const products = await Product.find({ category: categoryName })

//   res.json(products)
// })
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'product remove' })
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})
const createProduct = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body.images)
    const product = new Product({
      user: req.user._id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images,
      brand: req.body.brand,
      categories: req.body.categories,
      countInStock: req.body.countInStock,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, categories, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.categories = categories
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('product Not Found')
  }
})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('product Not Found')
  }
})
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
