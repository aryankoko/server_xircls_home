/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Row, Col, Label, Input, Form, Button } from 'reactstrap'
import Select from 'react-select'
import { postReq } from '../../../../assets/auth/jwtService'
import FrontBaseLoader from '../../../Components/Loader/Loader'

function CreateGroup() {
  const [useLoader, setLoader] = useState(false)
  const timeOptions = [
    { label: "Seconds", value: "seconds" },
    { label: "Minutes", value: "minutes" },
    { label: "Hours", value: "hours" },
    { label: "Days", value: "days" }
  ]
  const countryOptions = [
    { label: "United States", value: "US" },
    { label: "Canada", value: "CA" },
    { label: "United Kingdom", value: "UK" },
    { label: "Australia", value: "AU" }
  ]
  const cityOptions = [
    { label: "New York", value: "NY" },
    { label: "Los Angeles", value: "LA" },
    { label: "Chicago", value: "CHI" },
    { label: "San Francisco", value: "SF" }
  ]
  

  const [formData, setFormData] = useState({
    groupName: "",
    description: ""
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }))
    
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoader(true)
    console.log(formData)
    const formData_new = new FormData()
    Object.entries(formData).map(([key, value]) => {
  
        formData_new.append(key, value)
    })
    // postReq("")
    fetch('https://68f1-2402-e280-3d9c-20d-18f8-29de-acd1-35de.ngrok-free.app/group/', {
      method: 'POST',
      body: formData_new
    }).then((resp) => {
      console.log(resp)
    setLoader(false)
    }).catch((err) => {
      console.log(err)
    setLoader(false)

    })
  }
  return (
    <div>
      {
        useLoader && <FrontBaseLoader/>
      }
      <div className='card'>
        <h4 className='fw-bolder p-2'>Create a Group</h4>
      </div>
      <div className='card p-2'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
              <h5>Group Name</h5>
              <Input type="text" name="groupName" id="name" placeholder='Young....' value={formData.groupName} onChange={handleInputChange}></Input>
            </Col>
            <Col lg={6}>
              <h5>Description</h5>
              <textarea className="form-control" id="description" placeholder="Group contains only people wh...." name='description' rows="4" onChange={handleInputChange} value={formData.description} style={{ resize: "none" }}></textarea>
            </Col>
          </Row>
          <div className='d-flex justify-content-end mt-2 '>
            <button className=' btn btn-primary'>Create Group</button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CreateGroup