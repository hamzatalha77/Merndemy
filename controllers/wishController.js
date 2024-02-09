import asyncHandler from 'express-async-handler'
import Wish from '../models/wishModel.js'
const addWishItems = asyncHandler(async (req, res) => {
  const { wishItems } = req.body
  console.log(req.body)
  if (!wishItems || wishItems.length === 0) {
    res.status(400)
    throw new Error('No WishList Items')
  } else {
    const wish = new Wish({
      wishItems,
      user: req.user._id
    })
    const addedWishItems = await wish.save()
    res.status(201).json({
      message: 'The Products have been added to your WishList',
      addedWishItems
    })
  }
})
export { addWishItems }
