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
const createNewCategory = asyncHandler(async (req, res) => {
  try {
    const { category_name, imageCategory } = req.body

    const category = new Category({
      category_name,
      imageCategory
    })

    const slugCategory = slugify(category_name, { lower: true })
    category.slugCategory = slugCategory

    const createCategory = await category.save()

    res.status(201).json(createCategory)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (category) {
    await category.remove()
    res.json({ message: 'category has been removed' })
  } else {
    res.status(404)
    throw new Error('category not found')
  }
})

export { createNewCategory, getCategories, deleteCategory }
