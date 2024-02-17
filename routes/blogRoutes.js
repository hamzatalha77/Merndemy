import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleWare.js'
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog
} from '../controllers/blogController.js'
router.route('/').get(getBlogs).post(protect, createBlog)
router.route('/:id').put(updateBlog).delete(deleteBlog).get(getBlogById)

export default router
