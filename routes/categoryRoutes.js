import express from 'express'
const router = express.Router()
import {
  createCategory,
  getCategories
} from '../controllers/categoryController.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

router.route('/category/all').get(getCategories)
router.route('/category/create').post(protect, admin, createCategory)

export default router
