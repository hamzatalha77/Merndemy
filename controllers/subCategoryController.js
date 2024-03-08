import asyncHandler from 'express-async-handler'
import SubCategory from '../models/subCategoryModel.js'

const getSubCategories = asyncHandler(async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find()
    res.status(201).json({
      success: true,
      subCategories
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
const getSubCategoriesByCategory = asyncHandler(async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId
    const subCategories = await SubCategory.find({ category: categoryId })

    res.status(200).json({
      success: true,
      subCategories: subCategories
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

const createSubCategory = asyncHandler(async (req, res, next) => {
  try {
    const subCategory = await SubCategory.create(req.body)
    res.status(201).json({
      success: true,
      subCategory
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export { getSubCategories, createSubCategory, getSubCategoriesByCategory }
