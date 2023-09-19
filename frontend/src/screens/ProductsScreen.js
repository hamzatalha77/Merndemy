import React from 'react'
import Product from '../components/Product'
import { useLocation } from 'react-router-dom'
const ProductsScreen = () => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]
  return (
    <div>
      <h1>{cat}</h1>

      <Product cat={cat}></Product>
    </div>
  )
}

export default ProductsScreen
