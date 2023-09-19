import express from 'express'
import { uploadFilesMiddleware } from '../middleware/upload.js'
const router = express.Router()

// const DIR = 'uploads/'

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR)
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(' ').join('-')
//     cb(null, uuidv4() + '-' + fileName)
//   },
// })
// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true)
//     } else {
//       cb(null, false)
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
//     }
//   },
// })

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('Images only!')
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// router.post('/', upload.array('images', 12), (req, res) => {
//   res.send(`/${req.files.path}`)
// })

// export default router
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

// function checkFileType(req, file, cb) {
//   const filetypes = /jpg|jpeg|png|gif/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     console.log('test')
//     return cb(null, true)
//   } else {
//     console.log('test1')
//     req.locals = { ext: 'Images only!' }
//     cb('Images only!')
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(req, file, cb)
//   },
// })
// , upload.array('images', 4),

router.post('/', async (req, res) => {
  try {
    await uploadFilesMiddleware(req, res)
    if (req.files == undefined) {
      return res.send(`You must select a file.`)
    }
    // TODO: send to product router req files
    // choise save image or product
    console.log(req.files)
    // console.log(req.files[1])
    return res.send(req.files)
  } catch (error) {
    if (req.locals) return res.send(`${req.locals}`)
    return res.send(`${error.code}`)
  }
})

export default router
