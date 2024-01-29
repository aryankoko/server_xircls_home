/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FileText, Image, LogIn, PlayCircle, Plus } from 'react-feather'
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
  const [useMsgBody, setMsgBody] = useState(" Hello {{1}}, your code will expire in {{2}} mins.")
  const [useMsgFooter, setMsgFooter] = useState(null)
  const [useInteractive, setInteractive] = useState({})
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
      // console.log('uniqueIds', uniqueIds)
      // console.log('existingParametersMap', existingParametersMap)

      // Create a new parametersList, preserving existing values
      const newParametersList = uniqueIds.map(id => ({
        id,
        value: existingParametersMap[id] !== undefined ? existingParametersMap[id] : ''
      }))
      // console.log('newParametersList', newParametersList)

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
    updatedMessage = updatedMessage.replace(/\*(.*?)\*/g, (_, p1) => `<strong>${p1}</strong>`)
    updatedMessage = updatedMessage.replace(/_(.*?)_/g, (_, p1) => `<em>${p1}</em>`)
    updatedMessage = updatedMessage.replace(/~(.*?)~/g, (_, p1) => `<del>${p1}</del>`)


    // Set the updated message
    setDisplayedMessage(updatedMessage)
  }

  const addParameterBtn = () => {

    const existingIds = parametersList.map(obj => obj.id)
    // console.log(existingIds)
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
    const regex = /\{\{(\d+)\}\}/g

    const matches = value.match(regex) || []
    const existingIds = new Set()
    const updatedValue = value.replace(regex, (match, n) => {
      const numericN = parseInt(n, 10)

      // Ensure that the numericN does not exceed the length of matches
      const maxN = Math.max(matches.length, 1)
      console.log(maxN)
      const adjustedN = Math.min(numericN, maxN)

      if (existingIds.has(adjustedN)) {
        let newId = adjustedN
        while (existingIds.has(newId)) {
          newId++
        }
        existingIds.add(newId)
        return `{{${newId}}}`
      } else {
        // Add the ID to the set
        existingIds.add(adjustedN)
        return match
      }
    })

    setMsgBody(updatedValue)
    updateParametersList(updatedValue)
  }

  useEffect(() => {
    updateParametersList(useMsgBody)
  }, [useMsgBody])

  useEffect(() => {
    updateDisplayedMessage()
  }, [parametersList])

  // interactive change 

  const handleTnteractiveRadio = (e) => {
    const type = e.target.value
    console.log(e.target.value)
    if (type === 'Call') {
      setInteractive({
        type: 'Call',
        dataList: [
          {
            id: 1,
            actionType: '',
            title: "",
            value: ""
          }
        ]
      })
    } else if (type === 'Quick') {
      setInteractive({
        type: 'Quick',
        dataList: [
          {
            id: 1,
            title: ""
          }
        ]
      })
    }
  }

  // Add interactive add button
  const handleTnteractiveAdd = (type) => {
    if (type === 'Call') {
      setInteractive({
        type: 'Call',
        dataList: [
          ...useInteractive.dataList,
          {
            id: useInteractive.dataList.length + 1,
            actionType: '',
            title: "",
            value: ""
          }
        ]
      })
    } else if (type === 'Quick') {
      setInteractive({
        type: 'Quick',
        dataList: [
          ...useInteractive.dataList,
          {
            id: useInteractive.dataList.length + 1,
            title: ""
          }
        ]
      })
    }
  }
  // delete interactive del button
  const handleTnteractiveDel = (type, id) => {
    if (type === 'Call') {
      const uptList = useInteractive.dataList.filter((elm) => elm.id !== id)
      setInteractive({
        type: 'Call',
        dataList: [...uptList]
      })
    } else if (type === 'Quick') {
      const uptList = useInteractive.dataList.filter((elm) => elm.id !== id)
      setInteractive({
        type: 'Quick',
        dataList: [...uptList]
      })
    }
  }

  const handleInteractiveChange = (key, id, value) => {
 
  }
  // massgae body function olny ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  return (
    <Container style={{ marginBottom: "200px" }}>
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
                    <button className='btn btn-primary mt-1' onClick={addParameterBtn}>Add parameter</button>
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
                  onChange={(e) => setMsgFooter(e.target.value)}
                />
              </div>

            </Col>
            <Col lg="6" className='d-flex align-items-center flex-column   justify-content-center ' >

              <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: '400px', whiteSpace: 'pre-wrap' }}>
                <CardBody className='p-2'>
                  <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#e3e3e3" }}>
                    <Image size={45} color='#faad20' />
                    <PlayCircle size={45} color='#5f66cd' />
                    <FileText size={45} color='#f33d79' />
                  </div>

                  <div className='mt-2'>
                    {/* <h5>{displayedMessage}</h5> */}
                    <h5 dangerouslySetInnerHTML={{ __html: displayedMessage }}></h5>
                  </div>
                  {
                    useMsgFooter && <h6 className='text-secondary mt-1'>{useMsgFooter}</h6>
                  }
                </CardBody>
              </Card>
              <p style={{ width: '400px' }}>Disclaimer: This is just a graphical representation of the message that will be delivered. Actual message will consist of media selected and may appear different.</p>
            </Col>
          </Row>
          <div>


            <div className='mt-3'>
              <h4 className="">Interactive Actions</h4>
              <p className="fs-5  text-secondary">In addition to your message, you can send actions with your message.<br />
                Maximum 25 characters are allowed in CTA button title & Quick Replies.
              </p>
              <div className=''>
                <div className='d-flex w-75'>

                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio1' >
                    <Input type='radio' id='radio1' style={{ marginLeft: '15px' }} name='radio1' value='None' onChange={handleTnteractiveRadio} />
                    <p className="m-0">None</p>
                  </Label>


                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio2'  >
                    <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='Call' onChange={handleTnteractiveRadio} />
                    <p className="m-0">Call to Action</p>
                  </Label>

                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio3' >
                    <Input type='radio' id='radio3' style={{ marginLeft: '15px' }} name='radio1' value='Quick' onChange={handleTnteractiveRadio} />
                    <p className="m-0">Quick Replies
                    </p>
                  </Label>

                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio4' >
                    <Input type='radio' id='radio4' style={{ marginLeft: '15px' }} name='radio1' value='All' onChange={handleTnteractiveRadio} />
                    <p className="m-0">All</p>
                  </Label>
                </div>

                {/* UI Interactive */}
                <div className='mt-3 px-lg-3'>
                  {useInteractive.type === 'Call' && <div className='gap-1 d-flex flex-column  '>
                    {useInteractive.dataList.map((ele, index) => (<Row >
                      <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Call to Action {index + 1} :</p></Col>
                      <Col lg="3" className=''>  <Select isMulti={false} options={[{ value: 'phone', label: "Phone Number" }, { value: 'url', label: "URL" }]}
                        onChange={(e) => {
                          // const newArry= [... ]
                          const uptList = useInteractive.dataList.map((elm) => {
                            if (elm.id === ele.id) {
                              return elm
                            } else { return elm }

                          })
                          console.log(uptList)

                        }}
                        closeMenuOnSelect={true} /></Col>

                      <Col lg="3">
                        <input type="text" className="form-control form-control-lg" placeholder='Button Title' maxLength={25} onChange={(e) => handleInteractiveChange('title', ele.id, e.target.value)} />
                      </Col>

                      <Col lg="3">
                        <input type="text" className="form-control form-control-lg" placeholder='Button Value' onChange={(e) => handleInteractiveChange('value', ele.id, e.target.value)}/>
                      </Col>

                      <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4' onClick={() => handleTnteractiveDel("Call", ele.id)}>X</Col>

                    </Row>))}
                    <div>
                      <button className='btn btn-primary btn-sm d-flex gap-1 ' onClick={() => handleTnteractiveAdd('Call')}><Plus size={18} />  <p className='m-0'>Call to Action</p></button>
                    </div>
                  </div>}

                  {useInteractive.type === 'Quick' && <div className='gap-1 d-flex flex-column  '>
                    {useInteractive.dataList.map((ele, index) => (<Row>
                      <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Quick Reply {index + 1} :</p></Col>

                      <Col lg="4">
                        <input type="text" className="form-control form-control-lg" placeholder='Button Title' maxLength={25} />
                      </Col>
                      <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4' onClick={() => handleTnteractiveDel("Quick", ele.id)}>X</Col>

                    </Row>))}
                    <div>
                      <button className='btn btn-primary btn-sm d-flex gap-1 ' onClick={() => handleTnteractiveAdd('Quick')}><Plus size={18} />  <p className='m-0'>Quick Reply</p></button>
                    </div>
                  </div>}
                </div>
              </div>
            </div>

            <div>
              <button className='btn btn-primary mt-3'> submit</button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  )
}
