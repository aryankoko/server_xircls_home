/* eslint-disable */
import React, { useState } from 'react'
import {
  CardBody,
  CardText,
  Col,
  Container,
  Row
} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { BsAndroid2, BsInfoCircleFill } from 'react-icons/bs'
import {
  FaApple,
  FaBold,
  FaItalic,
  FaRegSmile
} from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { RxCross2 } from "react-icons/rx"
import {
  Button,
  FormGroup,
  Input,
  InputGroup,
  Label
} from 'reactstrap'
import { selectPhoneList } from '../../../Helper/data'

function WhatsTemp() {
  const [formData, setFormData] = useState({
    templateName: '',
    category: '',
    language: '',
    headerType: 'None',
    bodyText: '',
    footerText: '',
    headerText: '',
    countryCode: '',
    imageInput: null,
    videoInput: null,
    documentInput: null,
    imageObjectUrl: null,
    radioOption: 'None',
    checkboxes: {
      website: false,
      websiteInputTitle: '',
      websiteInput: '',
      phone: false,
      phoneInput: '',
      phoneInputTitle: '',
      quick: false,
      quickInputs: [""]
    },
    variables: [],
    variableTexts: {},
    headerVariables: [],
    headerVariableTexts: {}
  })

  const addVariable = () => {
    const newVariable =
      formData.variables.length === 0 ? 1 : Math.max(...formData.variables) + 1
    const newText = `{{${newVariable}}}`

    setFormData((prevData) => ({
      ...prevData,
      variables: [...prevData.variables, newVariable],
      variableTexts: {
        ...prevData.variableTexts,
        [newVariable]: '' // Initialize with an empty string
      },
      bodyText: prevData.bodyText + newText
    }))
  }

  const addHeaderVariable = (variable) => {
    const newVariable = formData.headerVariables.length === 0 ? 1 : Math.max(...formData.headerVariables) + 1
    const newText = `{{${newVariable}}}`

    setFormData((prevData) => ({
      ...prevData,
      headerVariables: [...prevData.headerVariables, newVariable],
      headerVariableTexts: {
        ...prevData.headerVariableTexts,
        [newVariable]: '' // Initialize with an empty string
      },
      headerText: prevData.headerText + newText
    }))
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'templateName') {
      const validatedValue = value.toLowerCase().replace(/[^a-z_]/g, '')
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: validatedValue
      }))
    } else if (name === 'countryCode' || name === 'phoneInput') {
      // Update the formData with the selected country code
      setFormData((prevFormData) => ({
        ...prevFormData,
        countryCode: value
      }))
    }
    else if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0]
      }))
    } else {
      // Check if the input is the bodyText, headerText, or footerText textarea
      if (name === 'bodyText' || name === 'headerText' || name === 'footerText') {
        const inputValue = value
        const regex = /\{\{(\d+)\}\}/g
        let match

        while ((match = regex.exec(inputValue)) !== null) {
          const variable = parseInt(match[1], 10)

          // Check if the variable is not already in the list
          if (!formData.variables.includes(variable) && name === 'bodyText') {
            addVariable(variable) // Add the variable if it's not in the list
          } else if (!formData.headerVariables.includes(variable) && name === 'headerText') {
            addHeaderVariable(variable) // Add the header variable if it's not in the list
          }
        }
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }))
    }
  }

  const handleRadioChange = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      radioOption: option,
    }));
  };

  const handleCheckboxChange = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      checkboxes: {
        ...prevFormData.checkboxes,
        [option]: !prevFormData.checkboxes[option]
      }
    }))
  }

  const payload = {
    name: formData.templateName,
    category: formData.category,
    language: formData.language,
    components: [
      // Optional Header
      formData.headerType !== 'None' && {
        type: 'HEADER',
        format: formData.headerType.toUpperCase(),
        ...(formData.headerType === 'Image' || formData.headerType === 'Document' || formData.headerType === 'Video'
          ? { example: { header_handle: formData.imageObjectUrl || formData.documentInput } }
          : {
            [formData.headerType.toLowerCase()]: formData.headerText,
            ...(formData.headerVariables && formData.headerVariables.length > 0 && {
              example: { header_text: Object.values(formData.headerVariableTexts) }
            })
          })
      },
      // Important Body
      {
        type: 'BODY',
        text: formData.bodyText,
        example:
          formData.variables && formData.variables.length > 0
            ? { body_text: [Object.values(formData.variableTexts)] }
            : undefined
      },
      // Optional Buttons
      (formData.checkboxes.website || formData.checkboxes.phone || formData.checkboxes.quickInputs.length > 0) && {
        type: 'BUTTONS',
        buttons:

          [
            formData.checkboxes.phone && {
              type: 'PHONE_NUMBER',
              text: formData.checkboxes.phoneInputTitle,
              phone_number: `${formData.countryCode}${formData.checkboxes.phoneInput}`
            },
            formData.checkboxes.website && {
              type: 'URL',
              text: formData.checkboxes.websiteInputTitle,
              url: formData.checkboxes.websiteInput
            },
            ...(formData.checkboxes.quickInputs.length > 0 && formData.checkboxes.quickInputs.map((text, index) => ({
              type: 'QUICK_REPLY',
              text: text
            }))),

          ].filter(Boolean)
      },
      // Optional Footer
      formData.footerText && {
        type: 'FOOTER',
        text: formData.footerText
      }
    ].filter(Boolean)
  };

  const payData = JSON.stringify(payload, null, 2);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form_data = new FormData()

    form_data.append("name", formData.templateName)
    form_data.append("category", formData.category)
    form_data.append("language", formData.language)
    form_data.append("image", formData.imageInput)
    form_data.append("document", formData.documentInput)
    form_data.append("video", formData.videoInput)
    form_data.append("components", JSON.stringify(payload.components))

    console.log(form_data);
    console.log(payData);

    // try {
    //   const response = await fetch('https://3a04-2405-201-7-8937-ad97-9647-754f-d215.ngrok-free.app/createTemplate/', {
    //     method: 'POST',
    //     // mode: "no-cors",
    //     // headers: {
    //     //   'Content-Type': 'multipart/form-data'
    //     // },
    //     body: form_data
    //   })

    //   if (response.ok) {
    //     const res = await response.json()
    //     console.log(res)
    //     console.log('Data submitted successfully!')
    //   } else {
    //     console.error('Error submitting data:', response.statusText)
    //   }
    // } catch (error) {
    //   console.error('Error:', error.message)
    // }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6}>
            <h4>Template Name</h4>
            <FormGroup>
              <input
                className='form-control w-100'
                type='text'
                name='templateName'
                id='templateName'
                style={{ height: '40px' }}
                value={formData.templateName}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <h4>Category</h4>
            <div>
              <FormGroup>
                <Input
                  type='select'
                  name='category'
                  id='category'
                  value={formData.category}
                  onChange={handleInputChange}
                  className='form-control'
                >
                  <option value='' disabled>
                    Select Category
                  </option>
                  <option value='MARKETING'>MARKETING</option>
                  <option value='UTILITY'>UTILITY</option>
                </Input>
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col xs={12}>
            <h4>Template(s)</h4>
          </Col>
          <Col xs={12}>
            <div className='d-flex  align-items-center '>
              <p className='mb-0'>Albanian</p>
              <FormGroup className='mt-3 ms-2'>
                <Input
                  type='select'
                  name='language'
                  id='language'
                  value={formData.language}
                  onChange={handleInputChange}
                >
                  <option value='' disabled>
                    {' '}
                    Add Language
                  </option>
                  <option value='en'>en</option>
                </Input>
              </FormGroup>
            </div>
          </Col>
          <hr className='mt-2' />
        </Row>
        <Row className='mt-4'>
          <Col lg={8}>
            <div className='left_first d-flex align-items-center justify-content-between accordion '>
              <h4 className='mb-0'>Template for Albanian Language </h4>
              <button
                type='button'
                className='btn btn-primary'
                style={{ background: 'green', border: 'none' }}
              >
                Add Sample
              </button>
            </div>
            <Card className='mt-4'>
              <CardBody>
                <h4> Header (Optional)</h4>
                <Card.Text className='mt-1'>
                  Add a title, or, select the media type you want to get
                  approved for this template's header
                </Card.Text>

                <div>
                  <FormGroup className='mt-3'>
                    {['None', 'Text', 'Image', 'Video', 'Document'].map(
                      (label, index) => (
                        <div
                          key={`inline-radio-${index}`}
                          className='mb-3 form-check-inline'
                        >
                          <Label check>
                            <Input
                              type='radio'
                              name='headerType'
                              value={label}
                              checked={formData.headerType === label}
                              onChange={handleInputChange}
                              className='me-1'
                            />
                            {label}
                          </Label>
                        </div>
                      )
                    )}
                  </FormGroup>

                  {formData.headerType === 'Text' && (
                    <div>
                      <Label for='headerText'>Text Input:</Label>
                      <Input
                        type='text'
                        id='headerText'
                        name='headerText'
                        value={formData.headerText}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {/* Display headerText variables */}
                      {formData.headerVariables &&
                        formData.headerVariables.map((variable) => (
                          <FormGroup key={variable} className='mt-2'>
                            <div className='d-flex align-items-center'>
                              <span className='me-2'>{'{{' + variable + '}}'}</span>
                              <input
                                className='form-control w-100'
                                type='text'
                                value={formData.headerVariableTexts[variable]}
                                onChange={(e) => setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  headerVariableTexts: {
                                    ...prevFormData.headerVariableTexts,
                                    [variable]: e.target.value
                                  }
                                }))}
                              />
                            </div>
                          </FormGroup>
                        ))}
                    </div>
                  )}

                  {formData.headerType === 'Image' && (
                    <div>
                      <Label for='imageInput'>Image Input:</Label>
                      <Input
                        type='file'
                        id='imageInput'
                        name='imageInput'
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            const imageUrl = URL.createObjectURL(file)
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              imageInput: file,
                              imageObjectUrl: imageUrl
                            }))
                          }
                        }}
                      />

                    </div>
                  )}

                  {formData.headerType === 'Video' && (
                    <div>
                      <Label for='videoInput'>Video Input:</Label>
                      <Input
                        type='file'
                        id='videoInput'
                        name='videoInput'
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              videoInput: file,
                            }))
                          }
                        }}
                      />
                    </div>
                  )}

                  {formData.headerType === 'Document' && (
                    <div>
                      <Label for='documentInput'>Document Input:</Label>
                      <Input
                        type='file'
                        id='documentInput'
                        name='documentInput'
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              documentInput: file,
                            }))
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
            <Card className='mt-4'>
              <Card.Body>
                <h4>Body</h4>
                <Card.Text className='mt-1'>
                  The Whatsapp message in the language you have selected
                </Card.Text>
                <FormGroup>
                  <textarea
                    className='form-control'
                    style={{ width: '100%', height: '200px', resize: 'none' }}
                    name='bodyText'
                    id='bodyText'
                    value={formData.bodyText}
                    onChange={handleInputChange}
                  ></textarea>
                </FormGroup>
                <div className='d-flex justify-content-between mt-2'>
                  <div className='left_side d-flex align-items-center gap-2'>
                    <IoIosAddCircle
                      className='fs-4'
                      style={{ cursor: 'pointer' }}
                    />
                    <Button onClick={addVariable}>Add variable</Button>
                    <BsInfoCircleFill className='fs-5' />
                  </div>
                  <div className='right_side d-flex align-items-center gap-4'>
                    <FaRegSmile />
                    <FaBold />
                    <FaItalic />
                  </div>
                </div>
                <div>
                  {formData.variables &&
                    formData.variables.map((variable) => (
                      <FormGroup key={variable} className='mt-2'>
                        <div className='d-flex align-items-center'>
                          <span className='me-2'>{'{{' + variable + '}}'}</span>
                          <input
                            className='form-control w-100'
                            type='text'
                            value={formData.variableTexts[variable]}
                            onChange={(e) => setFormData((prevFormData) => ({
                              ...prevFormData,
                              variableTexts: {
                                ...prevFormData.variableTexts,
                                [variable]: e.target.value
                              }
                            }))}
                          />
                        </div>
                      </FormGroup>
                    ))}
                </div>
              </Card.Body>
            </Card>

            <Card className='mt-4'>
              <CardBody>
                <h4>Footer (Optional)</h4>
                <CardText className='mt-1'>
                  Add a short line of text to the bottom of your message template.
                </CardText>
                <FormGroup>
                  <input
                    type='text'
                    className='w-100 p-1 form-control'
                    name='footerText'
                    id='footerText'
                    value={formData.footerText}
                    onChange={(e) => handleInputChange(e)}
                  />
                </FormGroup>
                {/* Display footerText variables */}
                {formData.footerVariables &&
                  formData.footerVariables.map((variable) => (
                    <FormGroup key={variable} className='mt-2'>
                      <div className='d-flex align-items-center'>
                        <span className='me-2'>{'{{' + variable + '}}'}</span>
                        <input
                          className='form-control w-100'
                          type='text'
                          value={formData.footerVariableTexts[variable]}
                          onChange={(e) => handleFooterVariableTextChange(variable, e.target.value)}
                        />
                      </div>
                    </FormGroup>
                  ))}
              </CardBody>
            </Card>
            <Card className='mt-4'>
              <CardBody>
                <h4>Buttons Optional</h4>
                <CardText>
                  Create buttons that let customers respond to your message or
                  take action.
                </CardText>
                {/* <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      checked={formData.checkboxes.website}
                      onChange={() => handleCheckboxChange('website')}
                    />{' '}
                    Add Website URL
                  </Label>
                  {formData.checkboxes.website && (
                    <Input
                      type='text'
                      placeholder='Enter Website URL'
                      value={formData.checkboxes.websiteInput}
                      onChange={(e) => handleTextInputChange('websiteInput', e.target.value)}
                    />
                  )}
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      checked={formData.checkboxes.phone}
                      onChange={() => handleCheckboxChange('phone')}
                    />{' '}
                    Add Phone Number
                  </Label>
                  {formData.checkboxes.phone && (
                    <InputGroup style={{ width: "100%" }}>
                      <Input
                        type="select"
                        name="countryCode"
                        id="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        style={{ width: "20%" }}
                      >
                        {selectPhoneList.map((option) => (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Input>
                      <Input
                        type='text'
                        placeholder='Enter Phone Number'
                        value={formData.checkboxes.phoneInput}
                        onChange={(e) => handleTextInputChange('phoneInput', e.target.value)}
                        maxLength={10}
                        style={{ width: "80%" }}
                      />
                    </InputGroup>
                  )}
                </FormGroup>
                <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={formData.checkboxes.quick}
                        onChange={() => handleCheckboxChange('quick')}
                      />
                      {' '}
                      Add Quick Replies
                    </Label>
                    {formData.checkboxes.quick && (
                      <Input
                        type="text"
                        placeholder="Enter Quick Replies"
                        value={formData.checkboxes.quickInputs}
                        onChange={(e) => handleTextInputChange('quickInputs', e.target.value)}
                      />
                    )}
                  </FormGroup> */}
                <div>
                  <div className='d-flex gap-3'>
                    <FormGroup check>
                      <Label check>
                        <Input
                          name='radioOption'
                          type="radio"
                          checked={formData.radioOption === 'None'}
                          onChange={() => handleRadioChange('None')}
                        />
                        {' '}
                        None
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          name='radioOption'
                          type="radio"
                          checked={formData.radioOption === 'CallToActions'}
                          onChange={() => handleRadioChange('CallToActions')}
                        />
                        {' '}
                        Call to Actions
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          name='radioOption'
                          type="radio"
                          checked={formData.radioOption === 'QuickReply'}
                          onChange={() => handleRadioChange('QuickReply')}
                        />
                        {' '}
                        Quick Reply
                      </Label>
                    </FormGroup>
                  </div>

                  {/* Conditional Rendering based on the selected radio option */}

                  <div className='mt-2'>

                    {formData.radioOption === 'CallToActions' && (
                      <>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type='checkbox'
                              checked={formData.checkboxes.website}
                              onChange={() => handleCheckboxChange('website')}
                            />{' '}
                            Add Website URL
                          </Label>
                          {formData.checkboxes.website && (
                            <InputGroup style={{ width: "100%" }}>
                              <Input type='text' style={{ width: "30%" }} id='websiteInputTitle' onChange={() => setFormData((prevFormData) => ({
                                ...prevFormData,
                                checkboxes: {
                                  ...prevFormData.checkboxes,
                                  websiteInputTitle: e.target.value
                                }
                              }))} placeholder='Button Title' />
                              <Input
                                type='text'
                                placeholder='Enter Website URL'
                                value={formData.checkboxes.websiteInput}
                                onChange={(e) => setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  checkboxes: {
                                    ...prevFormData.checkboxes,
                                    ["websiteInput"]: e.target.value
                                  }
                                }))}
                                style={{ width: "70%" }}
                              />
                            </InputGroup>
                          )}
                        </FormGroup>

                        <FormGroup check>
                          <Label check>

                            <Input
                              type='checkbox'
                              checked={formData.checkboxes.phone}
                              onChange={() => handleCheckboxChange('phone')}
                            />{' '}
                            Add Phone Number
                          </Label>
                          {formData.checkboxes.phone && (
                            <InputGroup style={{ width: "100%" }}>
                              <Input type='text' style={{ width: "100%" }} id='phoneInputTitle' onChange={(e) => setFormData((prevFormData) => ({
                                ...prevFormData,
                                checkboxes: {
                                  ...prevFormData.checkboxes,
                                  phoneInputTitle: e.target.value
                                }
                              }))} placeholder='Button Title' />
                              <Input
                                type="select"
                                name="countryCode"
                                id="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                style={{ width: "20%" }}
                              >
                                {selectPhoneList.map((option) => (
                                  <option key={option.label} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </Input>

                              <Input
                                type='text'
                                placeholder='Enter Phone Number'
                                value={formData.checkboxes.phoneInput}
                                onChange={(e) => setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  checkboxes: {
                                    ...prevFormData.checkboxes,
                                    ['phoneInput']: e.target.value
                                  }
                                }))}
                                maxLength={10}
                                style={{ width: "80%" }}
                              />
                            </InputGroup>
                          )}
                        </FormGroup>
                      </>
                    )}

                    {/* {formData.radioOption === 'QuickReply' && (
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            checked={formData.checkboxes.quick}
                            onChange={() => handleCheckboxChange('quick')}
                          />
                          {' '}
                          Add Quick Replies
                        </Label>
                        <div className='d-flex flex-column '>
                          {formData.checkboxes.quick && (
                            <Input
                              type="text"
                              placeholder="Enter Quick Replies"
                              value={formData.checkboxes.quickInputs}
                              onChange={(e) => handleTextInputChange('quickInputs', e.target.value)}
                            />
                          )}
                          <button type='button'
                            className='btn btn-primary' style={{width:"200px"}}>Quick Reply</button>
                        </div>
                      </FormGroup>
                    )} */}

                    {formData.radioOption === 'QuickReply' && (
                      <FormGroup check>
                        {/* <Label check>
                          <Input
                            type="checkbox"
                            checked={formData.checkboxes.quick}
                            onChange={() => handleCheckboxChange('quick')}
                          />
                          {' '}
                          Add Quick Replies
                        </Label> */}
                        <div className='d-flex flex-column'>
                          {(formData.checkboxes.quick || formData?.checkboxes?.quickInputs?.length > 0) &&
                            formData.checkboxes.quickInputs.map((input, index) => (
                              <div key={index} className="d-flex align-items-center mb-2">
                                <Input
                                  type="text"
                                  placeholder={`Enter Quick Reply ${index + 1}`}
                                  value={input}
                                  onChange={(e) =>
                                    setFormData((prevFormData) => ({
                                      ...prevFormData,
                                      checkboxes: {
                                        ...prevFormData.checkboxes,
                                        quickInputs: prevFormData.checkboxes.quickInputs.map((item, i) =>
                                          i === index ? e.target.value : item
                                        ),
                                      },
                                    }))
                                  }
                                />
                                <RxCross2
                                  onClick={() => setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    checkboxes: {
                                      ...prevFormData.checkboxes,
                                      quickInputs: prevFormData.checkboxes.quickInputs.filter((_, i) => i !== index),
                                    },
                                  }))} className='fs-3' />
                              </div>
                            ))}
                          {formData.checkboxes.quickInputs.length < 3 && !formData.checkboxes.quick && (
                            <button
                              type='button'
                              className='btn btn-primary'
                              style={{ width: '200px' }}
                              onClick={() => setFormData((prevFormData) => ({
                                ...prevFormData,
                                checkboxes: {
                                  ...prevFormData.checkboxes,
                                  quickInputs: [
                                    ...prevFormData.checkboxes.quickInputs,
                                    '',
                                  ],
                                },
                              }))}
                            >
                              Add Quick Reply
                            </button>
                          )}
                        </div>
                      </FormGroup>
                    )}

                  </div>
                </div>
              </CardBody>
            </Card>
            <Button
              type='submit'
              className='btn-primary text-end '
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
          <Col md={4} className='mt-5'>
            <Card>
              <CardBody>
                <div className='d-flex justify-content-between align-items-center'>
                  <h4 className='mb-0'>Preview</h4>
                  <div className='d-flex gap-2 fs-5'>
                    <BsAndroid2 />
                    <FaApple />
                  </div>
                </div>
                <hr />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default WhatsTemp

// ///

















{
  "name": "header_footer",
    "category": "MARKETING",
      "language": "en",
        "components": [
          {
            "type": "HEADER",
            "format": "TEXT",
            "text": "You can have your header text here"
          },
          {
            "type": "BODY",
            "text": "Hello {{1}}, this is a template with header and footer text.",
            "example": {
              "body_text": [
                [
                  "Raj"
                ]
              ]
            }
          },
          {
            "type": "FOOTER",
            "text": "You can write your footer text here"
          }
        ]
}





const handleMsgBodyChange = (value) => {
  const regex = /\{\{(\d+)\}\}/g;
  const matches = value.match(regex);
  let existarr = [];

  for (let i = 1; i < matches.length + 2; i++) {
    existarr.push(i);
  }

  console.log("existarr", existarr);

  const existingIds = new Set();
  const updatedValue = value.replace(regex, (match, n) => {
    if (existingIds.has(n)) {
      // Replace with the first number in existarr not in existingIds
      const replacementNumber = existarr.find((num) => !existingIds.has(num));
      existingIds.add(replacementNumber);
      return {{${ replacementNumber.toString() } };
    } else {
      existingIds.add(n);
      return match;
    }
  });

  setMsgBody(updatedValue);
  updateParametersList(updatedValue);
};

// upt with dynamic value reduce when user cut value 
// err : live not chnaging
const handleMsgBodyChange = (value) => {
  const regex = /\{\{(\d+)\}\}/g
  const matches = value.match(regex)

  const existarr = parametersList.map(obj => obj.id)

  let nonexistNumbers = parametersList.length + 2
  for (let i = 1; i < parametersList.length + 2; i++) {
    if (!existarr.includes(i)) {
      nonexistNumbers = i
      break // Break once we find the first non-existing number
    }
  }

  console.log("existarr.length", existarr.length)
  console.log("nonexistNumbers", nonexistNumbers)

  const existingIds = new Set()

  const updatedValue = value.replace(regex, (match, n) => {
    console.log("n", n)
    n = parseInt(n)
    
    if (n > parametersList.length) {
      console.log(`${n} > ${parametersList.length}`)
      existingIds.add(nonexistNumbers)
      return `{{${nonexistNumbers.toString()}}}`
    }
    // Convert n to an integer for comparison
    if (existingIds.has(n)) {
      // Replace with the first number in existarr not in existingIds
      
      existingIds.add(nonexistNumbers)
      return `{{${nonexistNumbers.toString()}}}`
    } else {
      existingIds.add(n)
      return match
    }
  })

  setMsgBody(updatedValue)
  updateParametersList(updatedValue)
}

const parametersList = [
  {
      "id": 1,
      "actionType": "quick",
      "code": "",
      "title": "",
      "value": ""
  },
  {
      "id": 1,
      "actionType": "url",
      "code": "",
      "title": "",
      "value": ""
  },
  {
      "id": 1,
      "actionType": "phone",
      "code": "",
      "title": "",
      "value": ""
  },
  {
      "id": 1,
      "actionType": "quick",
      "code": "",
      "title": "",
      "value": ""
  },
  {
      "id": 1,
      "actionType": "url",
      "code": "",
      "title": "",
      "value": ""
  }
]



const data =  [
  {
      "id": 1,
      "actionType": "phone",
      "code": "",
      "title": "",
      "value": ""
  }
]


{
  "type":"BUTTONS",
  "buttons": [
    {
      "type": "QUICK_REPLY",
      "text": "Unsubscribe from Promos"
    },
    {
      "type":"QUICK_REPLY",
      "text": "Unsubscribe from All"
    }
  ]
}