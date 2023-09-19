import { Axios } from 'axios'
import { response } from 'express'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
const FileUpload = (props) => {
  const [Images, setImages] = useState([])
  const onDrop = (files) => {
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    }
    formData.append('file', files[0])
    Axios.post('/api/products/uploadImage', formData, config).then(
      (response) => {
        if (response.data.success) {
          setImages([...Images, response.data.image])
          props.refreshFunction([...Images, response.data.image])
        } else {
          alert('faild to upload')
        }
      }
    )
  }
  return (
    <div>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            {console.log('getRootProps', { ...getRootProps() })}
            {console.log('getInputProps', { ...getInputProps() })}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    </div>
  )
}

export default FileUpload
