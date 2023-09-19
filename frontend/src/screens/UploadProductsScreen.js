import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'
const Champ = [
  { key: 1, value: 'zed' },
  { key: 2, value: 'akali' },
  { key: 3, value: 'kata' },
  { key: 4, value: 'yasuo' },
  { key: 5, value: 'darius' },
  { key: 6, value: 'kled' },
]

const UploadProductsScreen = () => {
  const [titleValue, setTitleValue] = useState('')
  const [priceValue, setPriceValue] = useState(0)
  const [descriptionValue, setDescriptionValue] = useState('')
  const [brandValue, setBrandValue] = useState('')
  const [countInStockValue, setCountInStockValue] = useState(0)
  const [champValue, setChampValue] = useState(1)
  const [Images, setImages] = useState([])
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }
  const onPriceChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }
  const onDescriptionChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }
  const onBrandChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }
  const onCountInStockChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }
  const onChampSelectChange = (event) => {
    setChampValue(event.currentTarget.value)
  }

  const updateImages = (newImages) => {
    setImages(newImages)
  }
  return (
    <div>
      <h1> UploadProductsScreen</h1>

      <form onSubmit>
        <FileUpload refreshFunction={updateImages} />
        <input
          onChange={onTitleChange}
          value={titleValue}
          type="text"
          placeholder="name"
        />
        <input
          onChange={onPriceChange}
          value={priceValue}
          type="number"
          placeholder="price"
        />
        <input
          onChange={onBrandChange}
          value={brandValue}
          type="text"
          placeholder="brand"
        />
        <input
          onChange={onCountInStockChange}
          value={countInStockValue}
          type="number"
          placeholder="countInStock"
        />
        <input
          onChange={onDescriptionChange}
          value={descriptionValue}
          type="text"
          placeholder="description"
        />
        <select onChange={onChampSelectChange}>
          {Champ.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <button onSubmit>Submit</button>
      </form>
    </div>
  )
}

export default UploadProductsScreen
