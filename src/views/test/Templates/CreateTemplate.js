/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CornerDownLeft, ExternalLink, FileText, Image, MapPin, Phone, PlayCircle, Plus } from 'react-feather'
import toast from 'react-hot-toast'
import Select from 'react-select'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import wp_back from './imgs/wp_back.png'

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
      value: "Location",
      label: "Location"
    }
  ]
  const tempCatgList = [
    { value: 'UTILITY', label: 'Utility' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'AUTHENTICATION', label: 'Authentication' }
  ]
  const langList = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' }
  ]

  const addCallOptions = [
    { value: 'PHONE_NUMBER', label: "Phone Number" },
    { value: 'URL', label: "URL" }
  ]
  const callOptions = () => {

    let opt = addCallOptions.slice() // Make a copy of the options array

    useInteractive.dataList.forEach(item => {
      opt = opt.filter(option => option.value !== item.actionType)
    })

    console.log(opt, 'opt')
    return opt
  }


  const [BasicTemplateData, setBasicTemplateData] = useState({
    templateName: '',
    templateCategory: null,
    language: null,
    headerText: '',
    msgDataType: "None",
    footer: ''
  })

  const [parametersList, setParametersList] = useState([])
  const [useMsgBody, setMsgBody] = useState(" Hello {{1}}, your code will expire in {{2}} mins.")


  const [useInteractive, setInteractive] = useState({
    type: 'None',
    dataList: []
  })
  const [useButtons, setButtons] = useState({
    QUICK_REPLY: 3,
    URL: 1,
    PHONE_NUMBER: 1
  })
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
      // Create a new parametersList, preserving existing values
      const newParametersList = uniqueIds.map(id => ({
        id,
        value: existingParametersMap[id] !== undefined ? existingParametersMap[id] : ''
      }))

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
    let updatedValue = value

    const matches = value.match(regex)

    if (matches) {
      const sortedMatches = matches.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0])
        const numB = parseInt(b.match(/\d+/)[0])
        return numA - numB
      })

      let sequenceNumber = 1
      sortedMatches.forEach((match) => {
        updatedValue = updatedValue.replace(match, `{{${sequenceNumber++}}}`)
      })
    }

    const uptStr = (input) => {
      const regex = /\{\{(\d+)\}\}/g
      let sequenceNumber = 1

      const updatedValue = input.replace(regex, (match) => {
        return `{{${sequenceNumber++}}}`
      })

      return updatedValue
    }
    setMsgBody(uptStr(updatedValue))
    updateParametersList(updatedValue)
  }


  useEffect(() => {
    updateParametersList(useMsgBody)
  }, [useMsgBody])

  useEffect(() => {
    updateDisplayedMessage()
  }, [parametersList])

  // interactive change---------------------------------------------------
  const handleTnteractiveRadio = (e) => {
    const type = e.target.value
    if (type === 'Call') {
      setInteractive({
        type: 'Call',
        dataList: [
          {
            id: 1,
            actionType: '',
            code: '',
            text: "",
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
            actionType: 'QUICK_REPLY',
            text: ""
          }
        ]
      })
    } else if (type === 'All') {
      setInteractive({
        type: 'All',
        dataList: []
      })
    } else {
      setInteractive({
        type: 'None',
        dataList: []
      })
    }
    setButtons({
      QUICK_REPLY: 3,
      URL: 1,
      PHONE_NUMBER: 1
    })
  }

  const handleInputChange = (index, field, value) => {
    setInteractive((prevState) => {
      const newDataList = [...prevState.dataList]
      newDataList[index][field] = value
      return { ...prevState, dataList: newDataList }
    })
  }

  const handleDeleteAction = (index) => {
    setInteractive((prevState) => {
      const newDataList = [...prevState.dataList]
      newDataList.splice(index, 1)
      return { ...prevState, dataList: newDataList }
    })
  }
  const handleAddAction = (allType) => {
    setInteractive((prevState) => {
      const newDataList = [...prevState.dataList]
      const newIndex = newDataList.length + 1

      if (prevState.type === 'Call') {
        newDataList.push({
          id: newIndex,
          actionType: '',
          title: '',
          value: ''
        })
      } else if (prevState.type === 'Quick') {
        newDataList.push({
          id: newIndex,
          actionType: 'QUICK_REPLY',
          title: ''
        })
      } else if (prevState.type === 'All') {
        newDataList.push({
          id: 1,
          actionType: allType,
          code: '',
          title: "",
          value: ""
        })
      }

      return { ...prevState, dataList: newDataList }
    })
  }

  useEffect(() => {
    if (useInteractive.type === "All") {
      const { dataList } = useInteractive

      const counts = dataList.reduce((acc, ele) => {
        if (ele.actionType === "QUICK_REPLY") {
          acc.quickNum++
        }
        if (ele.actionType === "URL") {
          acc.urlNum++
        }
        if (ele.actionType === "PHONE_NUMBER") {
          acc.phoneNum++
        }
        return acc
      }, { quickNum: 0, urlNum: 0, phoneNum: 0 })

      setButtons({
        QUICK_REPLY: 3 - counts.quickNum - counts.urlNum - counts.phoneNum,
        URL: 1 - counts.urlNum,
        PHONE_NUMBER: 1 - counts.phoneNum
      })
    }
  }, [useInteractive])


  const handleTemplateSubmit = () => {
    // Add interactive add button
    // const buttons = useInteractive.dataList.map((item) => )
    const filteredData = useInteractive.dataList.map(item => ({
      actionType: item.actionType || null,
      title: item.title || null,
      value: item.value || null,
      code: item.code || null
    })).filter(item => item.actionType || item.title || item.value || item.code)

    console.log(filteredData)
    const payload = {
      name: BasicTemplateData.templateName,
      category: BasicTemplateData.templateCategory,
      language: BasicTemplateData.language,
      components: [
        // header
        {
          type: 'HEADER',
          format: BasicTemplateData.msgDataType.toUpperCase(),
          text: BasicTemplateData.msgDataType === 'Text' ? BasicTemplateData.headerText : ''
        },

        // body
        {
          type: 'BODY',
          text: useMsgBody,
          example: {
            body_text: [parametersList.map(item => item.value)]
          }
        },
        {
          type: 'FOOTER',
          text: BasicTemplateData.footer
        },
        {
          type: "BUTTONS",
          buttons: [
            {

            }
          ]
        }
      ]
    }
    const payData = JSON.stringify(payload, null, 2)

    console.log("payData", payData)
    console.log("useInteractive", useInteractive)
    const pattern = /[^a-z0-9_]/

    return null
    try {
      const response = fetch('https://cbf2-2405-201-7-8937-ffc9-96e8-2d2d-fcd5.ngrok-free.app/createTemplate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payData
      })
      if (response.ok) {
        const res = response.json()
        console.log(res)
        console.log('Data submitted successfully!')
      } else {
        console.error('Error submitting data:', response)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }

    // Test if the inputString matches the pattern
    if (pattern.test(BasicTemplateData.templateName)) {
      // String contains special characters or whitespace
      toast.error("Only lower case alphabets, numbers and underscore is allowed for Template Name")
      return false
    }
    // console.log("BasicTemplateData", BasicTemplateData)
    // console.log("parametersList", parametersList)
    // console.log("useMsgBody", useMsgBody)
    // console.log("useInteractive", useInteractive)
    console.log("payData", payData)

  }
  // massgae body function olny ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  return (
    <Container style={{ marginBottom: "200px" }}>
      <Card>
        <CardBody>
          <h4 className="">New Template Message  <span className="text-danger fs-1">fix all quick reply btn</span></h4>
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

                  options={tempCatgList}
                  closeMenuOnSelect={true}
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, templateCategory: e.value })}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: '12px',
                      minHeight: '0'
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

                  options={langList}
                  closeMenuOnSelect={true}
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, language: e.value })}

                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: '12px',
                      minHeight: '0'

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
                  className="form-control "
                  placeholder='Template Name'
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, templateName: e.target.value })}
                />
              </div>

              <div className='mt-3'>
                <h4 className="mt-1">Template Type</h4>
                <p className="fs-5  text-secondary">Your template type should fall under one of these categories.</p>
                <Select
                  className=''

                  options={msgTypeList}
                  closeMenuOnSelect={true}
                  onChange={(e) => {
                    if (e && e.value !== BasicTemplateData.msgDataType.value) {
                      setBasicTemplateData({ ...BasicTemplateData, msgDataType: e.value })
                      // setOptOutRespConfig(null)
                    }
                  }}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      fontSize: '12px',
                      minHeight: '0'

                    })
                  }}
                />
              </div>
              <div>
                {BasicTemplateData.msgDataType === 'Text' &&

                  <div className='mt-3'>
                    <h4 className="">Template Header Text <span className='text-secondary'>(Optional)</span></h4>
                    <p className="fs-5  text-secondary">Your message content. Upto 60 characters are allowed.</p>
                    <input
                      type="text"
                      className="form-control "
                      placeholder='Enter Header text here'
                      maxLength={60}
                      onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, headerText: e.target.value })}
                    />
                  </div>}
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
                      maxLength={1024}
                    ></textarea>
                    <button className='btn btn-primary mt-1' onClick={addParameterBtn}>Add parameter</button>
                  </div>
                  {/* Sample values for parameters input */}
                  <div className='mt-3'>
                    <h4 className="">Sample Values</h4>
                    <p className="fs-5 text-secondary">
                      Specify sample values for your parameters. These values can be
                      changed at the time of sending. e.g. - {'{{1}}'}: Mohit, {'{{2}}'}: 5.
                    </p>
                    <div className='d-flex flex-column gap-1'>
                      {parametersList?.sort((a, b) => a.id - b.id).map((paramData) => (
                        <div className='d-flex' key={paramData.id}>
                          <div className='w-25 d-flex justify-content-center align-items-center '>
                            <h5>{`{{ ${paramData.id} }}`}</h5>
                          </div>
                          <div className='w-100'>
                            <input
                              type="text"
                              className="form-control "
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
                  className="form-control "
                  placeholder='Enter Footer text here'
                  maxLength={60}
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, footer: e.target.value })}
                />
              </div>

            </Col>

            {/* whatsapp ui  -------------------------------------------- */}
            <Col lg="6" className='d-flex align-items-center flex-column   justify-content-center ' >
              <div className=' d-flex flex-column  px-2 pe-4 py-5 ' style={{ width: '400px', whiteSpace: 'pre-wrap', gap: "5px", backgroundImage: `url(${wp_back})` }}>

                <Card className='rounded-3 shadow-lg  position-relative mb-0 whatsapp_template_card' >
                  <CardBody className='p-2'>
                    {BasicTemplateData.msgDataType === "None" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffddb0" }}>
                      <Image size={45} color='#faad20' />
                      <PlayCircle size={45} color='#5f66cd' />
                      <FileText size={45} color='#f33d79' />
                    </div>}
                    {BasicTemplateData.msgDataType === "Image" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffddb0" }}>
                      <Image size={45} color='#faad20' />
                    </div>}
                    {BasicTemplateData.msgDataType === "Video" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#bbc7ff" }}>
                      <PlayCircle size={45} color='#5f66cd' />
                    </div>}
                    {BasicTemplateData.msgDataType === "File" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffb8cf" }}>
                      <FileText size={45} color='#f33d79' />
                    </div>}
                    {BasicTemplateData.msgDataType === "Location" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffacb5" }}>
                      <MapPin size={45} color='#f70010ff' />
                    </div>}
                    {
                      BasicTemplateData.msgDataType === "Text" && <h6 className='fs-4 text-black bolder mb-1 '>{BasicTemplateData.headerText}</h6>
                    }
                    <div className='mt-2'>
                      <h5 dangerouslySetInnerHTML={{ __html: displayedMessage }}></h5>
                    </div>
                    {
                      BasicTemplateData.footer && <h6 className='text-secondary mt-1'>{BasicTemplateData.footer}</h6>
                    }
                  </CardBody>
                </Card>
                {
                  useInteractive.dataList && useInteractive.dataList.map((elem) => {
                    if (elem.actionType === 'PHONE_NUMBER' && elem.title !== '') {
                      return (
                        <div className="border rounded-3 bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                          <Phone size={17} /><h6 className='m-0 text-primary' > {elem.title}</h6>
                        </div>)
                    }
                    if (elem.actionType === 'URL' && elem.title !== '') {
                      return (
                        <div className="border rounded-3 bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                          <ExternalLink size={17} /><h6 className='m-0 text-primary' > {elem.title}</h6>
                        </div>)
                    }
                    if (elem.actionType === 'QUICK_REPLY' && elem.title !== '') {
                      return (
                        <div className="border rounded-3 bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                          <CornerDownLeft size={17} /> <h6 className='m-0 text-primary' > {elem.title}</h6>
                        </div>)
                    }
                  })
                }

              </div>

              <p className='mt-4' style={{ width: '400px' }}>Disclaimer: This is just a graphical representation of the message that will be delivered. Actual message will consist of media selected and may appear different.</p>
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
                    <Input type='radio' id='radio1' style={{ marginLeft: '15px' }} name='radio1' value='None' defaultChecked onChange={handleTnteractiveRadio} />
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
                <div className='mt-3 px-lg-1'>
                  {useInteractive.type === 'Call' && <div className='gap-1 d-flex flex-column  '>
                    {useInteractive.dataList.map((ele, index) => (
                      <Row key={index}>
                        <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Call to Action {index + 1} :</p></Col>
                        <Col lg="3" className=''>
                          <Select options={callOptions()}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                fontSize: '12px',
                                minHeight: '0'

                              })
                            }}
                            value={addCallOptions?.find(option => option.value === ele.actionType)}
                            onChange={(e) => handleInputChange(index, 'actionType', e.value)}
                            closeMenuOnSelect={true} />
                        </Col>
                        <Col lg="3">
                          <input
                            type="text"
                            className="form-control "
                            placeholder='Button Title'
                            maxLength={25}
                            value={ele.title}
                            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                          />
                        </Col>
                        {
                          ele.actionType === "PHONE_NUMBER" &&
                          <Col lg="1">
                            <Select options={msgTypeList}
                              styles={{
                                control: (baseStyles) => ({
                                  ...baseStyles,
                                  fontSize: '12px',
                                  minHeight: '0'

                                })
                              }} onChange={(e) => handleInputChange(index, 'code', e.value)}
                              closeMenuOnSelect={true} />
                          </Col>
                        }
                        <Col >
                          <input
                            type="text"
                            className="form-control "
                            placeholder='Button Value'
                            value={ele.value}
                            onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                          />
                        </Col>

                        <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                          <div onClick={() => handleDeleteAction(index)}>X</div>
                        </Col>
                      </Row>))}
                    <div>
                      {useInteractive.dataList.length <= 1 &&
                        <button className='btn btn-primary btn-sm d-flex gap-1' onClick={handleAddAction}>
                          <Plus size={18} /> <p className='m-0'>Call to Action</p>
                        </button>
                      }
                    </div>
                  </div>}

                  {useInteractive.type === 'Quick' &&
                    <div className='gap-1 d-flex flex-column  '>
                      {useInteractive.dataList.map((ele, index) => (
                        <Row key={index}>
                          <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Quick Reply {index + 1} :</p></Col>

                          <Col lg="4">
                            <input
                              type="text"
                              className="form-control "
                              placeholder='Button Title'
                              maxLength={25}
                              value={ele.title}
                              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                            />
                          </Col>
                          <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                            <div onClick={() => handleDeleteAction(index)}>X</div>
                          </Col>
                        </Row>))}
                      <div>
                        {

                          useInteractive.dataList.length <= 2 &&
                          <button className='btn btn-primary btn-sm d-flex gap-1' onClick={handleAddAction}>
                            <Plus size={18} /> <p className='m-0'>Quick Reply</p>
                          </button>
                        }

                      </div>
                    </div>}

                  {useInteractive.type === 'All' &&
                    <div className='gap-1 d-flex flex-column  '>
                      {useInteractive.dataList.sort((a, b) => ({ URL: 1, PHONE_NUMBER: 2, QUICK_REPLY: 3 }[a.actionType] - { URL: 1, PHONE_NUMBER: 2, QUICK_REPLY: 3 }[b.actionType])).map((ele, index) => {
                        if (ele.actionType === 'QUICK_REPLY') {
                          return (
                            <Row key={index}>
                              <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Quick Reply {index + 1} :</p></Col>

                              <Col lg="4">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.title}
                                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                />
                              </Col>
                              <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                                <div onClick={() => handleDeleteAction(index)}>X</div>
                              </Col>
                            </Row>)
                        }
                        if (ele.actionType === 'URL') {
                          return (
                            <Row key={index}>
                              <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Call to Action {index + 1} :</p></Col>
                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.actionType}
                                  disabled
                                />
                              </Col>

                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.title}
                                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                />
                              </Col>
                              <Col >
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Value'
                                  value={ele.value}
                                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                />
                              </Col>

                              <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                                <div onClick={() => handleDeleteAction(index)}>X</div>
                              </Col>
                            </Row>
                          )
                        }
                        if (ele.actionType === 'PHONE_NUMBER') {
                          return (
                            <Row key={index}>
                              <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Call to Action {index + 1} :</p></Col>
                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.actionType}
                                  disabled
                                />
                              </Col>

                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.title}
                                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                />
                              </Col>
                              <Col lg="1">
                                <Select options={[{ value: 'PHONE_NUMBER', label: "Phone Number" }, { value: 'URL', label: "URL" }]}
                                  styles={{
                                    control: (baseStyles) => ({
                                      ...baseStyles,
                                      fontSize: '12px',
                                      minHeight: '0'

                                    })
                                  }} onChange={(e) => handleInputChange(index, 'code', e.value)}
                                  closeMenuOnSelect={true} />
                              </Col>
                              <Col >
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Value'
                                  value={ele.value}
                                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                />
                              </Col>

                              <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                                <div onClick={() => handleDeleteAction(index)}>X</div>
                              </Col>
                            </Row>
                          )
                        }
                      })}
                      <div className='d-flex gap-2'>
                        <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center   gap-1 ${useButtons.QUICK_REPLY === 0 ? 'disabled' : ''}`} onClick={() => handleAddAction("QUICK_REPLY")} >
                          <Plus size={18} /> <p className='m-0'>Quick Reply</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.QUICK_REPLY}</p></div>
                        </div>
                        <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center  gap-1 ${useButtons.URL === 0 ? 'disabled' : ''}`} onClick={() => handleAddAction("URL")}>
                          <Plus size={18} /> <p className='m-0'>URL</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.URL}</p></div>
                        </div>
                        <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center  gap-1 ${useButtons.PHONE_NUMBER === 0 ? 'disabled' : ''}`} onClick={() => handleAddAction("PHONE_NUMBER")}>
                          <Plus size={18} /> <p className='m-0'>Phone Number</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.PHONE_NUMBER}</p></div>
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>

            <div>
              <button className='btn btn-primary mt-3' onClick={handleTemplateSubmit}> submit</button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  )
}
