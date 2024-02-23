import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Form, Label, Input, Button, Card, CardBody, InputGroup } from 'reactstrap'
import { selectPhoneList } from '../../../Helper/data'
import Select from "react-select"
import { validForm } from '../../Validator'
import toast from 'react-hot-toast'

function Settings() {
  const [isValidPassword, setIsValidPassword] = useState()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    companySize: "",
    industry: "",
    mobileNumber: "",
    timezone: "",
    password: "",
    countryCode: "",
    preferredBillingCurrency: ""
  })


  const formValuesCheck = [
    {
      name: 'fullName',
      message: 'Enter Full Name',
      type: 'string',
      id: 'fullName'
    },
    {
      name: 'email',
      message: 'Enter Email',
      type: 'email',
      id: 'email'
    },
    // {
    //   name: 'password',
    //   message: 'Password should be at least 6 characters & must contain at least one special character',
    //   type: 'string',
    //   id: 'password'
    // },
    {
      name: 'companyName',
      message: 'Enter Company Name',
      type: 'string',
      id: 'companyName'
    },
    {
      name: 'companySize',
      message: 'Select Company Size',
      type: 'string',
      id: 'companySize'
    },
    {
      name: 'industry',
      message: 'Select Industry',
      type: 'string',
      id: 'industry'
    },
    {
      name: 'countryCode',
      message: 'Select Country Code',
      type: 'string',
      id: 'countryCode'
    },
    {
      name: 'mobileNumber',
      message: 'Enter Mobile Number',
      type: 'number',
      id: 'mobileNumber'
    },
    {
      name: 'preferredBillingCurrency',
      message: 'Enter Preferred Billing Currency',
      type: 'string',
      id: 'preferredBillingCurrency'
    },
    {
      name: 'timezone',
      message: 'Enter Timezone',
      type: 'string',
      id: 'timezone'
    }

  ]


  const industryOptions = [
    { value: '', label: 'Industry' },
    { value: 'Ecommerce', label: 'Ecommerce' },
    { value: 'Education', label: 'Education' },
    { value: 'Automotive', label: 'Automotive' },
    { value: 'IT Services', label: 'IT Services' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'SAAS/Apps', label: 'SAAS/Apps' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Finance and Banking', label: 'Finance and Banking' },
    { value: 'Medical and Health', label: 'Medical and Health' },
    { value: 'Hotel and Lodging', label: 'Hotel and Lodging' },
    { value: 'Beauty,Spa and Salon', label: 'Beauty, Spa and Salon' },
    { value: 'Clothing and Apparel', label: 'Clothing and Apparel' },
    { value: 'Event Planning and Service', label: 'Event Planning and Service' },
    { value: 'Food and Grocery', label: 'Food and Grocery' },
    { value: 'Professional Services', label: 'Professional Services' },
    { value: 'Public Service', label: 'Public Service' },
    { value: 'Non-Profit', label: 'Non-Profit' },
    { value: 'Shopping and Retail', label: 'Shopping and Retail' },
    { value: 'Travel and Transportation', label: 'Travel and Transportation' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Other', label: 'Other' }
  ]


  const companySizeOptions = [
    { value: '', label: 'Company Size' },
    { value: '1-10', label: '1-10 Employees' },
    { value: '10-20', label: '10-20 Employees' },
    { value: '20-50', label: '20-50 Employees' },
    { value: '50-200', label: '50-200 Employees' },
    { value: '200+', label: '200+ Employees' }
  ]


  const validatePassword = (password) => {
    const regexTest = /[!@#$%^&*(),.?":{}|<>]/
    return password.length >= 6 && regexTest.test(password)
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setIsValidPassword(validatePassword(value))
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const postData = async () => {
    console.log(formData)
    const form_data = new FormData()
    Object.entries(formData).map(([key, value]) => {
      form_data.append(key, value)
    })
    try {
      const response = await fetch('https://3a04-2405-201-7-8937-ad97-9647-754f-d215.ngrok-free.app/fetchUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: form_data
      })

      if (response.ok) {
        console.log('Data submitted successfully!')
        console.log(response.json())
        console.log('Data submitted successfully!')
        toast.success('Account Created Successfully')
      } else {
        console.error('Error submitting data:', response.statusText)
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleSubmit = () => {
    const checkForm = validForm(formValuesCheck, formData)
    console.log(checkForm, 'checkForm')
    if (checkForm && isValidPassword) {
      postData()
    } else {
      console.log('pass not valid')
      toast.error("Enter Valid Password")
    }
  }

  return (
    <Container>
      <Row>
        <Col sm='12'>
          <Card>
            <CardBody>
              <div className='title'>
                <h4>Create Business</h4>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card>
        <CardBody >
          <Row>
            <Col md={6}>
              <Label for="fullName">Full Name</Label>
              <Input
                name='fullName'
                id='fullName'
                type='text'
                placeholder='Full Name'
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <p id="fullName_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
            <Col md={6}>
              <Label for="email">Email</Label>
              <Input
                name='email'
                id='email'
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <p id="email_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-1">
              <Label for="password">Password</Label>
              <Input
                name='password'
                id='password'
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <p className="text-secondary m-0 p-0 vaildMessage">
                <ul>
                  <li>Password should be at least 6 characters</li>
                  <li>Must contain at least one special character</li>
                </ul>
              </p>
            </Col>
            <Col md={6} className="mt-1">
              <Label for="companyName">Company Name</Label>
              <Input
                name='companyName'
                id='companyName'
                type='text'
                placeholder='Company Name'
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <p id="companyName_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="">
              <Label for="companySize">Company Size</Label>
              <Select
                name='companySize'
                id='companySize'
                options={companySizeOptions}
                value={companySizeOptions.filter((ele) => ele.value === formData.companySize)}
                onChange={((value) => {
                  handleInputChange({ target: { name: 'companySize', value: value.value } })
                })}
              />
              <p id="companySize_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
            <Col md={6} className="">
              <Label for="industry">Industry</Label>
              <Select
                name='industry'
                id='industry'
                options={industryOptions}
                value={industryOptions.filter((ele) => ele.value === formData.industry)}
                onChange={((value) => {
                  handleInputChange({ target: { name: 'industry', value: value.value } })
                })}
              />
              <p id="industry_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-1">
              <Label for="mobileNumber">Mobile Number</Label>
              <InputGroup>
                <Select
                  name="countryCode"
                  id="countryCode"
                  options={selectPhoneList}
                  value={selectPhoneList.filter((ele) => ele.value === formData.countryCode)}
                  onChange={((value) => {
                    handleInputChange({ target: { name: 'countryCode', value: value.value } })
                  })}
                />
                <Input
                  name='mobileNumber'
                  id='mobileNumber'
                  type='text'
                  placeholder='Mobile Number'
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </InputGroup>
              <p id="countryCode_val" className="text-danger m-0 p-0 vaildMessage"></p>
              <p id="mobileNumber_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
            <Col md={6} className="mt-1">
              <Label for="preferredBillingCurrency">Preferred Billing Currency</Label>
              <Input
                name='preferredBillingCurrency'
                id='preferredBillingCurrency'
                type='text' placeholder='INR'
                value={formData.preferredBillingCurrency}
                onChange={handleInputChange}
              />
              <p id="preferredBillingCurrency_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-1">
              <Label for="timezone">Timezone</Label>
              <Input
                name='timezone'
                id='timezone'
                type='text'
                placeholder='Timezone'
                value={formData.timezone}
                onChange={handleInputChange}
              />
              <p id="timezone_val" className="text-danger m-0 p-0 vaildMessage"></p>
            </Col>
          </Row>
          <div>
            <div className='submit_btn text-end '>
              <Button Button type="submit" className='btn-primary text-end ' onClick={() => handleSubmit()}>Submit</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  )
}

export default Settings