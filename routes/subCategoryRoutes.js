import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleWare.js'
import {
  createSubCategory,
  getSubCategories
} from '../controllers/subCategoryController.js'

router.route('/').get(getSubCategories).post(protect, admin, createSubCategory)

export default router
