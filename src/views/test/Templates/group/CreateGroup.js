/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Row, Col, Label, Input, Form, Button } from 'reactstrap'
import Select from 'react-select'

function CreateGroup() {
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
    name: "",
    description: "",
    setRules: false,
    selectedRules: []
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
              <Input type="text" name="name" id="name" placeholder='Young....' value={formData.name} onChange={handleInputChange}></Input>
            </Col>
            <Col lg={6}>
              <h5>Description</h5>
              <textarea className="form-control" id="description" placeholder="Group contains only people wh...." name='description' rows="4" onChange={handleInputChange} value={formData.description} style={{ resize: "none" }}></textarea>
            </Col>
          </Row>
          <form className='mt-4'>
            <h5>Set Rules for Group</h5>
            <div className='mt-2'>

              <div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="switch1" />
                  <label class="form-check-label" for="switch1">Spend on the page</label>
                </div>
                <div className='d-flex mt-1 gap-2'>
                  <div class="" >
                    <input type="number" class="form-control" />
                  </div>
                  <Select
                    options={timeOptions}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minHeight: "0",
                        minWidth: "150px"
                      })
                    }}
                  />

                </div>
              </div>
              <div className='mt-2'>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                  <label class="form-check-label" for="flexSwitchCheckChecked">Spend on the website</label>
                </div>
                <div className='d-flex mt-1 gap-2'>
                  <div class="" >
                    <input type="number" class="form-control" />
                  </div>
                  <Select
                    options={timeOptions}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minHeight: "0",
                        minWidth: "150px"
                      })
                    }}
                  />

                </div>
              </div>

              <div class="form-check form-switch mt-2">
                <input class="form-check-input" type="checkbox" id="switch2" />
                <label class="form-check-label" for="switch2">Read the page by</label>
              </div>

              <div class="form-check form-switch mt-1">
                <input class="form-check-input" type="checkbox" id="switch3" />
                <label class="form-check-label" for="switch3">Visited</label>
              </div>
              <div class="form-check form-switch mt-1">
                <input class="form-check-input" type="checkbox" id="switch4" />
                <label class="form-check-label" for="switch4">Not active on the page</label>
              </div>
              <div className='mt-1'>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="switch5" />
                  <label class="form-check-label" for="switch5">Based on Country</label>
                </div>
                <div className='d-flex mt-1 gap-2 ms-3'>
                  <Select
                    options={countryOptions}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minHeight: "0",
                        minWidth: "150px"
                      })
                    }}
                  />

                </div>
              </div>
              <div className='mt-1'>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="switch6" />
                  <label class="form-check-label" for="switch6">Based on City</label>
                </div>
                <div className='d-flex mt-1 gap-2 ms-3'>
                  <Select
                    options={cityOptions}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minHeight: "0",
                        minWidth: "150px"
                      })
                    }}
                  />

                </div>
              </div>
            </div>
          </form>
          <div className='d-flex justify-content-end mt-2 '>
            <button className=' btn btn-primary'>Create Group</button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CreateGroup