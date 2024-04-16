import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import subCategoryRoutes from './routes/subCategoryRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import http from 'http'
const app = express()

const server = http.createServer(app)
import { Server } from 'socket.io'
const io = new Server(server)

dotenv.config()
connectDB()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: ['https://merndemy-backend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  })
)
app.use(cors())
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'))
}

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/SubCategories', subCategoryRoutes)
app.use('/api/coupons', couponRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001

// this is for dynamic port

// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
//   )
// )
// this is socket.io
io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('addComment', (comment) => {
    io.emit('newComment', comment)
  })
})

export { io }
server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
