/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Image } from 'react-feather'
import Select from 'react-select'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import whatsapp from './imgs/whatsapp.png'

export default function CreateTemplate() {

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
  const [parametersList, setParametersList] = useState([])
  const [useMsgBody, setMsgBody] = useState("Use text formatting - *bold* , _italic_ & ~strikethrough~ Your message content. Upto 1024 characters are allowed. e.g. - Hello {{1}}, your code will expire in {{2}} mins.")
  const [displayedMessage, setDisplayedMessage] = useState(useMsgBody)
  // massgae body function olny ------------------------------------
   //  update parametersList based on the message
   const updateParametersList = (message) => {
    const regex = /{{\s*(\d+)\s*}}/g
    const matches = message.match(regex)

    if (matches) {
      // Extract unique parameter ids from the message
      const uniqueIds = [...new Set(matches.map(match => parseInt(match.match(/\d+/)[0])))]
      // Create a map of existing parameters for efficient lookup
      const existingParametersMap = parametersList.reduce((map, param) => {
        map[param.id] = param.value
        return map
      }, {})
      console.log('uniqueIds', uniqueIds)
      console.log('existingParametersMap', existingParametersMap)

      // Create a new parametersList, preserving existing values
      const newParametersList = uniqueIds.map(id => ({
        id,
        value: existingParametersMap[id] !== undefined ? existingParametersMap[id] : ''
      }))
      console.log('newParametersList', newParametersList)

      // Set the new parametersList
      setParametersList(newParametersList)
    } else {
      // If no parameters found, reset the parametersList
      setParametersList([])
    }
  }

  //  update displayedMessage with replaced parameter values
  const updateDisplayedMessage = () => {
    let updatedMessage = useMsgBody

    // Replace placeholders with parameter values in the message
    parametersList.forEach(param => {
      const regex = new RegExp(`{{\\s*${param.id}\\s*}}`, 'g')
      if (param.value !== '') {
        updatedMessage = updatedMessage.replace(regex, `[${param.value}]`)
      }
    })

    // Replace text enclosed within * * with bold representation
    updatedMessage = updatedMessage
    // .replace(/\(([^*]+)\*\)/g, (_, p1) => `<strong>${p1}</strong>`)
    // .replace(/([^~]+)~/g, (_, p1) => `<del>${p1}</del>`)
    // .replace(/([^]+)/g, (_, p1) => `<em>${p1}</em>`)

    // Set the updated message
    setDisplayedMessage(updatedMessage)
  }

  const addParameterBtn = () => {

    const existingIds = parametersList.map(obj => obj.id)
    console.log(existingIds)
    for (let i = 1; i < parametersList.length + 2; i++) {
      if (!existingIds.includes(i)) {
        const prev = `${useMsgBody}{{${i}}}`
        setMsgBody(prev)
        return null
      }
    }

  }

  //  handle parameter value changes
  const handleParameterChange = (id, value) => {
    setParametersList((prevList) => prevList.map((param) => (param.id === id ? { ...param, value } : param))
    )
  }

  //  handle template message changes
  const handleMsgBodyChange = (value) => {
    setMsgBody(value)
    updateParametersList(value)
  }
  
    useEffect(() => {
      updateParametersList(useMsgBody)
    }, [useMsgBody])
  
    useEffect(() => {
      updateDisplayedMessage()
    }, [parametersList])
  
  // massgae body function olny ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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

                {/* msg body ---------------------------------------------- */}
                <div className='mt-3'>
                <div className='mt-3'>
                  <h4 className="">Template Format</h4>
                  <p className="fs-5 text-secondary">
                    Use text formatting - *bold* , _italic_ & ~strikethrough~
                    Your message content. Upto 1024 characters are allowed.
                    e.g. - Hello {`{{1}}`}, your code will expire in {`{{2}}`} mins.
                  </p>
                  <textarea
                    className="form-control"
                    value={useMsgBody}
                    onChange={(e) => handleMsgBodyChange(e.target.value)}
                    rows="5"
                  ></textarea>
                  <button className='btn btn-primary' onClick={addParameterBtn}>add parameter</button>
                </div>
                {/* Sample values for parameters input */}
                <div className='mt-3'>
                  <h4 className="">Sample Values</h4>
                  <p className="fs-5 text-secondary">
                    Specify sample values for your parameters. These values can be
                    changed at the time of sending. e.g. - {'{{ 1}}'}: Mohit, {'{{ 2}}'}: 5.
                  </p>
                  <div className='d-flex flex-column gap-1'>
                    {parametersList?.map((paramData) => (
                      <div className='d-flex' key={paramData.id}>
                        <div className='w-25 d-flex justify-content-center align-items-center '>
                          <h5>{`{{ ${paramData.id}}}`}</h5>
                        </div>
                        <div className='w-100'>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder='Sample value'
                            maxLength={60}
                            value={paramData.value}
                            onChange={(e) => handleParameterChange(paramData.id, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
                {/* msg body ---------------------------------------------- */}
               

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

            <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: '400px', whiteSpace: 'pre-wrap' }}>
                <img src={whatsapp} alt='' width={40} className=' position-absolute  ' style={{ marginTop: '-20px', marginLeft: '-20px', zIndex: '8' }} />
                <CardBody>
                  <div className='p-1'>
                    {/* <h5>{displayedMessage}</h5> */}
                    <h5 dangerouslySetInnerHTML={{ __html: displayedMessage }}></h5>

                  </div>
                </CardBody>
              </Card>

            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  )
}
