import express from 'express'
const router = express.Router()
import {
  createNewCategory,
  deleteCategory,
  getCategories
} from '../controllers/categoryController.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

router.route('/category/all').get(getCategories)
router.route('/category/create').post(protect, admin, createNewCategory)
router.route('/category/:id').delete(protect, admin, deleteCategory)

export default router
