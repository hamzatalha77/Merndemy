import util from 'util'
import multer from 'multer'
import path from 'path'
// const dest = path.join(__dirname, "../upload");

const fileFilter = (req, file, cb) => {
  // filter of size images
  const sizeContent = req.headers['content-length']
  if (sizeContent >= 2 * 1024 * 1024) {
    // 2 MB (max file size) // create a filter for size check
    req.locals = 'The file size should be less than 2 MB'
    cb(new Error('The file size should be less than 2 MB'), false)
    return
  }

  // filter of extention images
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/git' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true)
  } else {
    req.locals = 'not type git or jpg/jpeg or png'
    cb(new Error('not type pdf or jpg/jpeg or png'), false)
    return
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads') // dest
  },
  filename: async (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        path.extname(file.originalname).toLowerCase()
    )
  },
})

var uploadFile = multer({ storage, fileFilter }).array('images', 4)
// check the documentation promisify
var uploadFilesMiddleware = util.promisify(uploadFile)

export { uploadFilesMiddleware }
