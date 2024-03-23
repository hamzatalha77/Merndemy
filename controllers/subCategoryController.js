import asyncHandler from 'express-async-handler'
import SubCategory from '../models/subCategoryModel.js'
import slugify from 'slugify'
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

const createNewSubCategory = asyncHandler(async (req, res) => {
  try {
    const { category, subCategory_name, imageSubCategory } = req.body

    const subCategory = new SubCategory({
      category,
      subCategory_name,
      imageSubCategory
    })

    const slugSubCategory = slugify(subCategory_name, { lower: true })
    subCategory.slugSubCategory = slugSubCategory

    const createSubCategory = await subCategory.save()

    res.status(201).json(createSubCategory)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
})
export { getSubCategories, createNewSubCategory, getSubCategoriesByCategory }
