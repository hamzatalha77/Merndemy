import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json({
      success: true,
      category
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})


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
export { createCategory, getCategories }
