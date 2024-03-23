import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleWare.js'
import {
  createNewSubCategory,
  getSubCategories,
  getSubCategoriesByCategory
} from '../controllers/subCategoryController.js'

router
  .route('/')
  .get(getSubCategories)
  .post(protect, admin, createNewSubCategory)

router.route('/category/:categoryId').get(getSubCategoriesByCategory)

export default router
