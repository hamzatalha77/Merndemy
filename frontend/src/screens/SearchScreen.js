import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
// import Category from '../components/Category'

const SearchScreen = ({ match }) => {
  const [category, setCategory] = useState('')

  const categories = [category]

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category))
  }, [dispatch, keyword, pageNumber, category])

  return (
    <>
      <Meta />

      <Link to="/" className="btn btn-black">
        Go Back
      </Link>

      <Col>
        <h1>categories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category} onClick={() => setCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </Col>
      <h1>latest products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default SearchScreen
