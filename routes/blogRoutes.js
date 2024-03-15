import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleWare.js'
import {
  addComment,
  addLike,
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  removeLike,
  updateBlog
} from '../controllers/blogController.js'

router.route('/').get(getBlogs).post(protect, admin, createBlog)
router
  .route('/:id')
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog)
  .get(getBlogById)
router.route('/comment/:id').put(protect, addComment)
router.route('/addLike/:id').put(protect, addLike)
router.route('/removeLike/:id').put(protect, removeLike)
export default router
