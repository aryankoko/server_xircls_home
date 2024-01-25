/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import ResizableTextarea from './components/ResizableTextarea'
import whatsapp from './imgs/whatsapp.png'
import { Image } from 'react-feather'

export default function CreateTemplate() {
  const msgBodyRef = useRef()

  const msgTypeList = [
    {
      value: "Text",
      label: "Text"
    },
    {
      value: "Image",
      label: "Image"
    },
    {
      value: "File",
      label: "File"
    },
    {
      value: "Video",
      label: "Video"
    },
    {
      value: "Audio",
      label: "Audio"
    },
    {
      value: "Carousel",
      label: "Carousel"
    }
  ]
  const tempCatgList = [
    { value: 'UTILITY', label: 'UTILITY' },
    { value: 'MARKETING', label: 'MARKETING' },
    { value: 'AUTHENTICATION', label: 'AUTHENTICATION' }
  ]
  const [msgDataType, setmsgDataType] = useState(msgTypeList[0])
  const [ParametersList, setParametersList] = useState([])

  const [useTemplateData, setTemplateData] = useState({
    msgBody: "Final Hours to Go! Offer Ends Soon 👋 {{1}}% Discount on Any purchase | It's Time to Action 💥 Use Discount Code 👉 {{2}} & Get {{3}} Discount Expires Tonight ❗ 👉{{4}} 👉{{5}} 👉{{6}} Happy Shopping 🥳🥳"

  })
  const addInputField = (num) => {
    setParametersList([...ParametersList, { id: ParametersList.length + 1, value: '' }])
    // setTemplateData(prevState => ({ ...prevState, msgBody: `${useTemplateData.msgBody}{{${ParametersList.length + 1}}}` }))
  }
  function findAndAlert(str) {
    const regex = /{{(\d+)}}/g
    const matches = str.match(regex)
    if (matches) {
      console.log(`Found: ${matches.join(', ')}`)
    } 
  }
  findAndAlert(useTemplateData.msgBody)
  const updateState = (key, value) => {
    setTemplateData(prevState => ({ ...prevState, [key]: value }))
  }


  console.log("useTemplateData", useTemplateData)

  const RenderWhatsppUI = () => {
    return (
      <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: "400px", whiteSpace: 'pre-wrap' }} >
        <img src={whatsapp} alt="" width={40} className=' position-absolute  ' style={{ marginTop: "-20px", marginLeft: "-20px", zIndex: '8' }} />
        <CardBody >

          {
            msgDataType.value !== "Image" &&
            <div>
              <div className=' rounded-2 w-100  bg-success d-flex  justify-content-center  align-items-center ' style={{ minHeight: "200px" }} >
                <Image size={50} />
              </div>
            </div>
          }

          <div className='p-1'>
            <h5>{useTemplateData?.msgBody}</h5>
          </div>

        </CardBody>

      </Card>
    )
  }


  return (
    <Container>
      <Card>
        <CardBody>
          <h4 className="">New Template Message</h4>
        </CardBody>
      </Card>

      <Card>
        <CardBody>

          <Row>
            <Col md="6">
              <div>
                <h4 className="">Template Category</h4>
                <p className="fs-5  text-secondary">Your template should fall under one of these categories.</p>
                <Select
                  className=''
                  isMulti={false}
                  options={tempCatgList}
                  closeMenuOnSelect={true}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: '12px'
                    })
                  }}
                />
              </div>
            </Col>
            <Col md="6">
              <div>
                <h4 className="">Template Language</h4>
                <p className="fs-5  text-secondary">You will need to specify the language in which message template is submitted.</p>
                <Select
                  className=''
                  isMulti={false}
                  options={msgTypeList}
                  closeMenuOnSelect={true}

                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: '12px'
                    })
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className='mt-3'>
                <h4 className="">Template Name</h4>
                <p className="fs-5  text-secondary">Name can only be in lowercase alphanumeric characters and underscores. Special characters and white-space are not allowed
                  e.g. - app_verification_code</p>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder='Template Name'

                />
              </div>

              <div className='mt-3'>
                <h4 className="mt-1">Template Type</h4>
                <p className="fs-5  text-secondary">Your template type should fall under one of these categories.</p>
                <Select
                  className=''
                  isMulti={false}
                  options={msgTypeList}
                  closeMenuOnSelect={true}
                  onChange={(e) => {
                    if (e && e.value !== msgDataType.value) {
                      setmsgDataType(e)
                      // setOptOutRespConfig(null)
                    }
                  }}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: '12px'
                    })
                  }}
                />
              </div>
              <div>

                {/* msg body */}
                <div className='mt-3'>
                  <h4 className="">Template Format</h4>
                  <p className="fs-5  text-secondary">Use text formatting - *bold* , _italic_ & ~strikethrough~
                    Your message content. Upto 1024 characters are allowed.
                    e.g. - Hello {'{{1}}'}, your code will expire in {'{{2}}'} mins.</p>
                  {/* <ResizableTextarea  maxLength={1024} placeholder='Enter your message in here...' initialContent={useTemplateData.msgBody } onChange={(e) => updateState('msgBody', e.target.value)} /> */}

                  <textarea className="form-control" value={useTemplateData.msgBody} onChange={(e) => updateState('msgBody', e.target.value)} rows="5"></textarea>
                  <button className='btn btn-primary' onClick={addInputField}> Add Parameters</button>
                </div>
                {/* msg key words */}
                <div className='mt-3'>
                  <h4 className="">Sample Values</h4>
                  <p className="fs-5  text-secondary">Specify sample values for your parameters. These values can be changed at the time of sending.
                    e.g. - {'{{ 1}}'}: Mohit, {'{{ 2}}'}: 5.</p>
                  <div className='d-flex flex-column  gap-1'>
                    {

                      ParametersList?.map((paramData) => (
                        <div className='d-flex '>
                          <div className='w-25 d-flex justify-content-center  align-items-center '>
                            <h5>{`{{ ${paramData.id}}}`}</h5>
                          </div>
                          <div className='w-100'>
                            <input
                              type="text"
                              className="form-control form-control-lg "
                              placeholder='Sample value'
                              maxLength={60}

                            />
                          </div>
                        </div>
                      ))
                    }

                  </div>

                </div>

              </div>
              <div className='mt-3'>
                <h4 className="">Template Footer <span className='text-secondary'>(Optional)</span></h4>
                <p className="fs-5  text-secondary">Your message content. Upto 60 characters are allowed.</p>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder='Enter Footer text here'
                  maxLength={60}
                />
              </div>


              <div className='mt-3'>
                <h4 className="">Interactive Actions</h4>
                <p className="fs-5  text-secondary">In addition to your message, you can send actions with your message.<br />
                  Maximum 25 characters are allowed in CTA button title & Quick Replies.
                </p>
                <div className='d-flex gap-1'>
                  <div className='form-check p-0'>
                    <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio1' >
                      <Input type='radio' id='radio1' style={{ marginLeft: '15px' }} name='radio1' value='None' />
                      <p className="m-0">None</p>
                    </Label>

                  </div>
                  <div className='form-check p-0'>
                    <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio2' >
                      <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='Call' />
                      <p className="m-0">Call to Action</p>
                    </Label>
                  </div>
                  <div className='form-check p-0'>
                    <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio2' >
                      <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='Quick' />
                      <p className="m-0">Quick Replies
                      </p>
                    </Label>
                  </div>
                  <div className='form-check p-0'>
                    <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio2' >
                      <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='All' />
                      <p className="m-0">All</p>
                    </Label>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="6" className='d-flex align-items-center  justify-content-center ' >

              <RenderWhatsppUI />


            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  )
}
