import asyncHandler from 'express-async-handler'
import Wish from '../models/wishModel.js'

const addWishItems = asyncHandler(async (res, req) => {
  const { wishItems } = req.body
  if (wishItems && wishItems.length === 0) {
    res.status(400)
    throw new Error('No WishList Items')
    return
  } else {
    const wish = new Wish({
      wishItems,
      user: req.user._id,
    })
    const addWishItems = await wish.save()
    res.status(201).json(addWishItems)
  }
})
export { addWishItems }
