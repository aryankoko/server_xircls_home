/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Row, Col, Label, Input, Form, Button } from 'reactstrap'

function CreateGroup() {
  const rulesList = [
    "Group for India region only",
    "Age group for 16-25",
    "Language preference: English speakers only",
    "Members must contribute to discussions regularly",
    "Members must have an interest in technology and innovation",
    "Members must reside within the same city or region",
    "Membership requires approval from group administrators"
]


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    setRules: false,
    selectedRules:[]
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked
      }))
    } else {

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <div>
      <div className='card'>
        <h4 className='fw-bolder p-2'>Create a Group</h4>
      </div>
      <div className='card p-2'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
              <h5>Group Name</h5>
              <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}></Input>
            </Col>
            <Col lg={6}>
              <h5>Description</h5>
              <textarea className="form-control" id="description" name='description' rows="4" onChange={handleInputChange} value={formData.description} style={{ resize: "none" }}></textarea>
            </Col>
          </Row>
          <Form className='mt-4'>
            <div class="form-check form-switch">
              <label class="fs-5 fw-bold text-dark" for="flexSwitchCheckChecked">Set Rules</label>
              <input class="form-check-input" type="checkbox" name="setRules" id="flexSwitchCheckChecked" onChange={handleInputChange} />
            </div>
            {/* <button className='btn btn-primary' > Set Rules</button> */}

            <div>
              <h5 className='mt-2'>Select Rules for Group</h5>

              <div className='d-flex flex-column mt-2  align-items-start ' style={{gap:"5px"}}>
                {
                  rulesList.map((item, index) => (
                    <div class="form-check  ">
                    <input class="form-check-input" type="checkbox" value="" id={`check${index}`} />
                    <label class="form-check-label" for={`check${index}`}>
                      {item}
                    </label>
                  </div>
                  ))
                }
               

              </div>

            </div>
          </Form>
          <div className='d-flex justify-content-end mt-2 '>
            <button className=' btn btn-primary'>Create Group</button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CreateGroup