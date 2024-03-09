import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import slugify from 'slugify'
import mongoose from 'mongoose'
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 9
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  let query = {}

  if (req.query.category && req.query.category !== '') {
    const categoryId = req.query.category

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' })
    }

    query.category = categoryId
  }

  if (req.query.subCategory && req.query.subCategory !== '') {
    const subCategoryId = req.query.subCategory

    if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
      return res.status(400).json({ message: 'Invalid subcategory ID' })
    }

    query.subCategory = subCategoryId
  }

  if (req.query.minPrice && req.query.maxPrice) {
    const minPrice = Number(req.query.minPrice)
    const maxPrice = Number(req.query.maxPrice)
    query.price = { $gte: minPrice, $lte: maxPrice }
  } else if (req.query.minPrice) {
    const minPrice = Number(req.query.minPrice)
    query.price = { $gte: minPrice }
  } else if (req.query.maxPrice) {
    const maxPrice = Number(req.query.maxPrice)
    query.price = { $lte: maxPrice }
  }

  try {
    const products = await Product.find({ ...keyword, ...query })
      .populate('category', 'category_name')
      .populate('subCategory', 'subCategory_name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    const count = await Product.countDocuments({ ...keyword, ...query })

    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
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
      category,
      subCategory,
      countInStock
    } = req.body

    const product = new Product({
      user: req.user._id,
      name,
      price,
      images,
      description,
      brand,
      category,
      subCategory,
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
  const {
    name,
    images,
    price,
    description,
    brand,
    category,
    countInStock,
    subCategory
  } = req.body

  let product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.brand = brand
    product.category = category
    product.subCategory = subCategory
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
const productCategory = asyncHandler(async (req, res, next) => {
  try {
    const cat = await Product.find()
      .populate('category', 'name')
      .distinct('category')
    res.status(201).json({
      success: true,
      cat
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
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
  productCategory,
  addWishItems
}
