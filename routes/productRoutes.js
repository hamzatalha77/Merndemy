import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  addWishItems,
  productCategory
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleWare.js'
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/top').get(getTopProducts)
router.route('/wishlist').put(protect, addWishItems)
router.route('/product/categories').get(productCategory)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
