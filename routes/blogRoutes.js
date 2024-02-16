import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleWare.js'
import { createBlog } from '../controllers/blogController.js'
router.route('/').post(protect, createBlog)

export default router
