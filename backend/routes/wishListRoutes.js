import express from 'express'
const router = express.Router()
import { addWishItems } from '../controllers/wishController.js'

import { protect } from '../middleware/authMiddleWare.js'

router.route('/').post(addWishItems)
export default router
