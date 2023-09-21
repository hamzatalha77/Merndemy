import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'james alex',
    email: 'alex@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'hamza talha',
    email: 'hamza@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
