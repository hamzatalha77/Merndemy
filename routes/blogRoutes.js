import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleWare.js'
import { createBlog, updateBlog } from '../controllers/blogController.js'
router.route('/').post(protect, createBlog)
router.route('/:id').put(updateBlog)

export default router
