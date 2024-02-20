import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import slugify from 'slugify'
const getProducts = asyncHandler(async (req, res) => {
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
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

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

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      images,
      price,
      description,
      brand,
      categories,
      countInStock
    } = req.body

    const product = new Product({
      user: req.user._id,
      name,
      price,
      images,
      description,
      brand,
      categories,
      countInStock
    })

    const slug = slugify(name, { lower: true })
    product.slug = slug

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, images, price, description, brand, categories, countInStock } =
    req.body

  let product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.brand = brand
    product.categories = categories
    product.countInStock = countInStock

    if (images) {
      product.images = images
    }

    const slug = slugify(name, { lower: true })
    product.slug = slug

    product.updatedAt = new Date()

    product = await product.save()

    res.json({ message: 'product has been updated with success', product })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
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
      user: req.user._id
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

const addWishItems = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { productId } = req.body
  try {
    const user = await User.findById(_id)
    const alreadyAdded = user.wishlist.find((id) => id.toString() === productId)
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: productId }
        },
        {
          new: true
        }
      )
      res.json(user)
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: productId }
        },
        {
          new: true
        }
      )
      res.json(user)
    }
  } catch (error) {
    throw new Error(error)
  }
})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  addWishItems
}
