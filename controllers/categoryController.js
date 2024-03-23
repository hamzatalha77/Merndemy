import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import slugify from 'slugify'
const getCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await Category.find()
    res.status(201).json({
      success: true,
      categories
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { category_name, image, subCategory } = req.body

    const product = new Category({
      category_name,
      image,
      subCategory
    })

    const slug = slugify(category_name, { lower: true })
    product.slug = slug

    const category = await Category.save()

    res.status(201).json(category)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})
// const createCategory = asyncHandler(async (req, res, next) => {
//   try {
//     const slug = slugify(name, { lower: true })
//     category.slug = slug
//     const category = await Category.create(req.body)
//     res.status(201).json({
//       success: true,
//       category
//     })
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// })

export { createCategory, getCategories }
