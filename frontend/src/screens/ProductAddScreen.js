import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'

const ProductAddScreen = ({ history }) => {
  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, success } = productCreate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct(
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
      )
    )
  }
  const uploadFileHandler = async (e) => {
    // let files = e.target.files
    const newFiles = []
    for (let i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i])
    }
    const formData = new FormData()
    for (const key of Object.keys(newFiles)) {
      formData.append('images', newFiles[key])
    }
    setFiles(formData)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      console.log(data)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go Backsss
      </Link>
      <FormContainer>
        <h1>Add New Product</h1>
        {loading && <Loader></Loader>}
        {error && <Message variant="danger"> {error} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Group className="mb-3">
                <Form.Label>Upload File</Form.Label>
                <Form.Control
                  type="file"
                  id="image-file"
                  custom
                  onChange={uploadFileHandler}
                  multiple
                />
              </Form.Group>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Count </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count in Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Add New
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductAddScreen
