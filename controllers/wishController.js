import asyncHandler from 'express-async-handler'
import Wish from '../models/wishModel.js'

const addWishItems = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { prodId } = req.body
  try {
    const user = User.findById(_id)
    const alreadyAdded = user.wishList.find((id) => id.toString() === prodId)
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: prodId }
        },
        {
          new: true
        }
      )
      res.json(user)
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishList: prodId }
        },
        {
          new: true
        }
      )
      res.json(user)
    }
  } catch (error) {
    throw new Error(error)
  }
})

// const removeWishItem = asyncHandler(async (req, res) => {
//   const wish = await Wish.findById(req.params.id)
//   if (wish) {
//     await Wish.remove()
//     res.status(202).json('This Product Has been Removed from your wish list')
//   } else {
//     res.status(204)
//     throw new Error('Item Not found')
//   }
// })
export { addWishItems }

// const addWishItems = asyncHandler(async (req, res) => {
//   const { wishItems } = req.body

//   if (!wishItems || wishItems.length === 0) {
//     res.status(400)
//     throw new Error('No WishList Items')
//   } else {
//     const wish = new Wish({
//       wishItems,
//       user: req.user._id
//     })
//     const addedWishItems = await wish.save()

//     console.log(wishItems)
//     res.status(201).json({
//       message: 'The Products have been added to your WishList',
//       addedWishItems
//     })
//   }
// })
