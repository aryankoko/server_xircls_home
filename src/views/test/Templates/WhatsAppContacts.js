
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { FiUpload } from "react-icons/fi"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import toast from 'react-hot-toast'
import { postReq } from '../../../assets/auth/jwtService'
import FrontBaseLoader from '../../Components/Loader/Loader'
export default function WhatsAppContacts() {
  const [fileData, setFileData] = useState({})
  const [useLoader, setLoader] = useState(false)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const containerRef = useRef(null)

  console.log(fileData)

  const handleFile = (file) => {
    console.log('Selected file:', file)
    if (file) {
      const isCSV = file.name.toLowerCase().endsWith('.csv')
      if (isCSV) {
        console.log('Selected file:', file)
        setFileData(prev => (file))
      } else {
        toast.error('Please select a CSV file.')
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    console.log('Selected file:', selectedFile)
    handleFile(selectedFile)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  containerRef.current.style.cursor = 'alias'

  }

  const handleDragLeave = () => {
    containerRef.current.style.cursor = 'auto'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    containerRef.current.style.cursor = 'auto'
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const uploadFile = () => {
    const form_data = new FormData()
    console.log('csvFile', fileData)
    form_data.append('csvFile', fileData)
    setLoader(true)
    postReq('import_customer', form_data)
   .then(res => {
    console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)
      } else {
        toast.alert(res.data.message)
      }
      setLoader(false)
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
          // Handle 500 error
          toast.error('Internal Server Error')
      } else {
          // Handle other errors
          console.log(error)
      }
      setLoader(false)

  })
    
    // fetch('https://daf4-2402-e280-3d9c-20d-a5e9-6dbd-1388-ddc3.ngrok-free.app/sendBulkMessage/', {
    //   method: 'POST',
    //   body: form_data
    // })
    //   .then(response => {
    //     if (response.status === 400) {
    //       throw new Error('Bad Request: Invalid Data')
    //     }
    //     return response.json()
    //   }).then(res => {
    //     console.log(res)
    //     if (res.success) {
    //       toast.success(res.message)
    //     } else {
    //       toast.alert(res.message)
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.message === 'Bad Request: Invalid Data') {
    //       // Handle 400 error specifically
    //       toast.alert("Invalid data provided. Please check your input.")
    //     } else {
    //       console.log(err)
    //       toast.alert("Something went wrong!")
    //     }
    //     toast.alert("Something went wrong!")
      
    // })
  }

  return (
    <>
    {
     useLoader && <FrontBaseLoader/>
    }
      <Row style={{ height: '75vh' }}>
        <Col md={'6'} className='d-grid align-items-center'>
          <div className='p-2'>
            <h1 className=' text-center mt-2 fs-2 fw-bolder text-start main-heading'>Instruction</h1>
            <p className='m-0 text-center fw-medium' style={{ marginTop: '0.5rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean magna est, rhoncus sed mauris in, posuere eleifend diam. Nunc mi sem, semper eget sagittis id, viverra id felis. Proin rutrum maximus convallis. Aliquam non lorem non augue vestibulum tincidunt. Suspendisse vestibulum vulputate sapien sed varius. Integer blandit condimentum sapien. Mauris tempor hendrerit dolor luctus pretium. Mauris condimentum mi in ullamcorper lobortis. Phasellus vel gravida sem. Integer porttitor risus vel quam aliquet blandit. Phasellus consequat non purus id vehicula. Pellentesque condimentum odio ultrices, ullamcorper elit non, laoreet turpis. Proin efficitur dolor turpis, ac vestibulum libero dapibus venenatis.</p>
          </div>
        </Col>
        <Col md={'6'} className='d-grid align-items-center'>
          <div className='d-flex flex-column justify-content-center align-items-center '>
            {!(fileData?.name) ? <div className='d-flex flex-column justify-content-center align-items-center '>
              <h1 className=' text-center mt-2 fs-2 fw-bolder text-start main-heading'>Upload Your File</h1>
              <h5 className='m-0 text-center '>Before uploading, please make sure that your file is in CSV format.</h5>
              <div className='rounded-3 d-grid align-content-center mt-3 cursor-pointer' id='drag-container' ref={containerRef} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current.click()} style={{ border: '2px dashed #cecdcd', width: '400px', height: '200px', backgroundColor: '#f3f3f3' }}>
                <div className='d-flex justify-content-center'>
                  <FiUpload scale={6} size={50} />
                </div>
                <p className='m-0 text-center mt-1 fw-medium cursor-pointer'>Drag and drop or <a>choose you file</a> to start uploading.</p>
                <p className='m-0 text-center fw-medium cursor-pointer' style={{ marginTop: '0.5rem' }}>Only .csv format is supported.</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className='d-none'
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </div>
              
            </div> : <>
              <h1 className=' text-center mt-2 fs-2 fw-bolder text-start main-heading'>Your File has been uploaded</h1>
              <h5 className='m-0 text-center '>{fileData.name}</h5>
              <div className='rounded-3 d-grid align-content-center mt-3 cursor-pointer' style={{ border: '2px dashed #cecdcd', width: '400px', height: '200px' }}>
                <div className='d-flex justify-content-center'>
                  <IoIosCheckmarkCircleOutline size={120} color='green' />
                </div>
                <h5 className='m-0 text-center mt-1 fw-medium'>{fileData.name}</h5>
              </div>
              <div className='d-flex '>

                <button  className='m-0 text-center mt-1 px-3 fw-medium btn  ' onClick={() => setFileData()}>Clear</button>
                <button  className='m-0 text-center mt-1 px-3 fw-medium btn btn-primary ' onClick={uploadFile}>Upload</button>
              </div>
            </>}
          </div>
        </Col>
      </Row>

    </>

  )
}