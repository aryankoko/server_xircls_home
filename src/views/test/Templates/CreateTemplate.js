/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CornerDownLeft, ExternalLink, FileText, Image, MapPin, Phone, PlayCircle, Plus } from 'react-feather'
import toast from 'react-hot-toast'
import Select from 'react-select'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import wp_back from './imgs/wp_back.png'
import { selectPhoneList } from '../../../Helper/data'
import { postReq } from '../../../assets/auth/jwtService'

export default function CreateTemplate() {
  const paramVals = [{ value: 'First_name', label: "First_name" }, { value: 'Last_name', label: "Last_name" }, { value: 'customer_name', label: "customer_name" }, { value: 'Company_name', label: "Company_name" }, { value: 'Order_ID', label: "Order_ID" }, { value: 'Product_name', label: "Product_name" }]
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
      value: "Document",
      label: "Document"
    },
    {
      value: "Video",
      label: "Video"
    }
  ]
  const tempCatgList = [
    { value: 'UTILITY', label: 'Utility' },
    { value: 'MARKETING', label: 'Marketing' }
  ]
  const langList = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ar', label: 'Arabic' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ko', label: 'Korean' },
    { value: 'nl', label: 'Dutch' },
    { value: 'tr', label: 'Turkish' },
    { value: 'sv', label: 'Swedish' }
  ]


  const addCallOptions = [
    { value: 'PHONE_NUMBER', label: "Phone Number" },
    { value: 'URL', label: "URL" }
  ]
  const callOptions = () => {
    let opt = addCallOptions.slice()
    useInteractive.dataList.forEach(item => {
      opt = opt.filter(option => option.value !== item.actionType)
    })

    return opt
  }


  const [BasicTemplateData, setBasicTemplateData] = useState({
    templateName: '',
    templateCategory: '',
    language: '',
    headerText: '',
    headerUrl: '',
    msgDataType: "None",
    footer: ''
  })

  // headrer
  const [Header, setHeader] = useState({
    type: 'None',
    text: '',
    file: ''
  })

  const [Header_Parameters, setHeader_Parameters] = useState([])


  const Header_text_change = (e) => {
    setHeader({ ...Header, text: e.target.value })
  }

  const addHeaderParam = (e) => {
    const uptstr = `${Header.text}{{1}}`
    setHeader({ ...Header, text: uptstr })
  }

  useEffect(() => {
    if (Header.text.includes("{{1}}")) {
      // Update header parameters
      setHeader_Parameters([{ id: 1, value: null }])
    } else {
      setHeader_Parameters([])
    }

  }, [Header.text])

  // 
  // 
  const [Body_Parameters, setBody_Parameters] = useState([])
  const [useMsgBody, setMsgBody] = useState("Hello {{1}}, your code will expire in {{2}} mins.")


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
  //  update Body_Parameters based on the message
  const updateParametersList = (message) => {
    const regex = /{{\s*(\d+)\s*}}/g
    const matches = message.match(regex)

    if (matches) {
      const uniqueIds = [...new Set(matches.map(match => parseInt(match.match(/\d+/)[0])))]
      const existingParametersMap = Body_Parameters.reduce((map, param) => {
        map[param.id] = param.value
        return map
      }, {})
      const newParametersList = uniqueIds.map(id => ({
        id,
        value: existingParametersMap[id] !== undefined ? existingParametersMap[id] : ''
      }))

      setBody_Parameters(newParametersList)
    } else {
      setBody_Parameters([])
    }
  }

  //  update displayedMessage with replaced parameter values
  const updateDisplayedMessage = () => {
    let updatedMessage = useMsgBody

    Body_Parameters.forEach(param => {
      const regex = new RegExp(`{{\\s*${param.id}\\s*}}`, 'g')
      if (param.value !== '') {
        updatedMessage = updatedMessage.replace(regex, `[${param.value}]`)
      }
    })

    updatedMessage = updatedMessage.replace(/\*(.*?)\*/g, (_, p1) => `<strong>${p1}</strong>`)
    updatedMessage = updatedMessage.replace(/_(.*?)_/g, (_, p1) => `<em>${p1}</em>`)
    updatedMessage = updatedMessage.replace(/~(.*?)~/g, (_, p1) => `<del>${p1}</del>`)

    setDisplayedMessage(updatedMessage)
  }

  const addParameterBtn = () => {

    const existingIds = Body_Parameters.map(obj => obj.id)
    for (let i = 1; i < Body_Parameters.length + 2; i++) {
      if (!existingIds.includes(i)) {
        const prev = `${useMsgBody}{{${i}}}`
        setMsgBody(prev)
        return null
      }
    }
  }

  //  handle parameter value changes
  const handleParameterChange = (id, value) => {
    setBody_Parameters((prevList) => prevList.map((param) => (param.id === id ? { ...param, value } : param))
    )
  }

  //  handle template message changes
  const handleMsgBodyChange = (event) => {
    const input = event.target
    const cursorPosition = input.selectionStart // Get the cursor position

    const value = input.value
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

    const updatedText = uptStr(updatedValue)

    // Set input value preserving cursor position
    input.value = updatedText

    // Restore cursor position
    input.setSelectionRange(cursorPosition, cursorPosition)

    // Perform other actions as needed
    setMsgBody(updatedText)
    updateParametersList(updatedText)
  }


  useEffect(() => {
    updateParametersList(useMsgBody)
  }, [useMsgBody])

  useEffect(() => {
    updateDisplayedMessage()
  }, [Body_Parameters])

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
            actionType: 'QUICK_REPLY',
            title: ""
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


  const formValidation = () => {

    const errorMsg = {
      templateName: "Enter Template Name",
      templateCategory: "Select Template Category",
      language: "Select Template Language"
    }
    // console.log("BasicTemplateData", BasicTemplateData)
    // console.log("Body_Parameters", Body_Parameters)
    // console.log("useMsgBody", useMsgBody)
    // console.log("useInteractive", useInteractive)
    // const requiredFields = ['templateName', 'templateCategory', 'language']

    if (BasicTemplateData.templateName === '') {
      toast.error(errorMsg['templateName'])
      return false
    }
    const pattern = /[^a-z0-9_]/
    if (pattern.test(BasicTemplateData.templateName)) {
      // String contains special characters or whitespace
      toast.error("Only lower case alphabets, numbers and underscore is allowed for Template Name")
      return false
    }
    if (BasicTemplateData.templateCategory === '') {
      toast.error(errorMsg['templateCategory'])
      return false
    }
    if (BasicTemplateData.language === '') {
      toast.error(errorMsg['language'])
      return false
    }
    if (BasicTemplateData.useMsgBody === '') {
      toast.error(errorMsg['useMsgBody'])
      return false
    }
    return true


  }

  const handleTemplateSubmit = () => {
    if (!formValidation()) {
      return false
    }

    const newInteractiveData = useInteractive.dataList.map(item => {
      if (item.title === '') {
        return null // Skip items without a title
      }

      if (item.actionType === "PHONE_NUMBER") {
        return {
          type: item.actionType,
          text: item.title,
          phone_number: item.code.replace(/\+/g, '') + item.value
        }
      } else if (item.actionType === "URL") {
        return {
          type: item.actionType,
          text: item.title,
          url: item.value
        }
      } else if (item.actionType === "QUICK_REPLY") {
        return {
          type: item.actionType,
          text: item.title
        }
      } else {
        // Handle unmatched cases
        return null
      }
    }).filter(Boolean) // Remove null entries from the result

    const components = [
      Header.type === 'Document' && {
        type: 'HEADER',
        format: Header.type.toUpperCase(),
        example: { header_handle: [''] }
      },
      Header.type === 'Image' && {
        type: 'HEADER',
        format: Header.type.toUpperCase(),
        example: { header_handle: [''] }
      },
      Header.type === 'Video' && {
        type: 'HEADER',
        format: Header.type.toUpperCase(),
        example: { header_handle: [''] }
      },
      Header.type === 'Text' && {
        type: 'HEADER',
        format: 'TEXT',
        text: Header.text,
        example: {
          header_text: [Header_Parameters.map(item => item.value)][0]
        }

      },
      {
        type: 'BODY',
        text: useMsgBody,
        example: {
          body_text: [Body_Parameters.map(item => item.value)]
        }

      },

      BasicTemplateData.footer !== '' && {

        type: 'FOOTER',
        text: BasicTemplateData.footer
      },

      useInteractive.type !== "None" && {
        type: "BUTTONS",
        buttons: newInteractiveData
      }
    ].filter(Boolean)

    // const payData = JSON.stringify(payload, null, 2)
    const formData = new FormData()

    formData.append('name', BasicTemplateData.templateName)
    formData.append('category', BasicTemplateData.templateCategory)
    formData.append('language', BasicTemplateData.language)
    formData.append('components', JSON.stringify(components))
    formData.append('headerUrl', Header.file)

    // Now you can use formData for your purpose

    console.log("payload", components)
    console.log("useInteractive", useInteractive)
    console.log(BasicTemplateData)
    console.log(Header.file)

    // return null
    postReq("createTemplate", formData).then((res) => {
      console.log(res)
      if (res.data.code === 100) {
        toast.error(res.data.error_user_msg)
      } else {
        // toast.success("Template has been created")

      }
      if (res.id) {
        toast.success("Template has been created")

      }
    }).catch((err) => console.log(err))

    // Test if the inputString matches the pattern

    // console.log("BasicTemplateData", BasicTemplateData)
    // console.log("Body_Parameters", Body_Parameters)
    // console.log("useMsgBody", useMsgBody)
    // console.log("useInteractive", useInteractive)
    // console.log("payData", payData)

  }
  // massgae body function olny ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  return (
    <Container style={{ marginBottom: "200px" }}>
      <Card>
        <CardBody>
          <h4 className="">New Template Message </h4>
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
                    if (e && e.value !== Header.type.value) {
                      setHeader({ ...Header, type: e.value })
                      // setOptOutRespConfig(null)
                    }
                  }}
                />
              </div>
              {/* header */}
              <div>

                <div>
                  {Header.type === 'Text' &&
                    <div className='mt-3'>
                      <h4 className="">Template Header Text </h4>
                      <p className="fs-5  text-secondary">Your message content. Upto 60 characters are allowed.</p>
                      <input
                        type="text"
                        value={Header.text}
                        className="form-control "
                        placeholder='Enter Header text here'
                        maxLength={60}
                        onChange={Header_text_change}
                      />
                      <button className={`btn btn-primary mt-1 ${Header_Parameters.length >= 1 ? 'd-none' : 'd-block'}`} onClick={addHeaderParam}>add parameter</button>
                      <div>
                        {
                          Header_Parameters.map((item) => (
                            <div className="mt-1">
                              <Select options={paramVals}
                                onChange={(e) => { setHeader_Parameters([{ id: 1, value: e.value }]) }}
                                closeMenuOnSelect={true} />
                            </div>
                          ))
                        }
                      </div>
                    </div>}
                  {(Header.type === 'Image' || Header.type === 'Video' || Header.type === 'Document') &&

                    <div className='mt-3'>
                      <h4 className="">{Header.type} Media File</h4>
                      <p className="fs-5  text-secondary">Choose your media file</p>
                      <div className='d-flex align-items-center gap-1 mt-1'>
                        <input type="file" className='d-none' name="mediaUrl" id="mediaUrl" onChange={(e) => setHeader({ ...Header, file: e.target.files[0] })} />
                        <label htmlFor="mediaUrl" className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </label>
                      </div>
                    </div>}
                </div>
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
                      onChange={handleMsgBodyChange}
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
                      {Body_Parameters?.sort((a, b) => a.id - b.id).map((paramData) => {
                        return (
                          <div className='d-flex' key={paramData.id}>
                            <div className='w-25 d-flex justify-content-center align-items-center '>
                              <h5>{`{{ ${paramData.id} }}`}</h5>
                            </div>
                            <div className='w-100'>
                              <Select options={paramVals}
                                value={{ value: 'paramData', label: paramData.value }}
                                onChange={(e) => handleParameterChange(paramData.id, e.label)}
                                closeMenuOnSelect={true} />

                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* msg body  end---------------------------------------------- */}


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
                    {Header.type === "None" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffddb0" }}>
                      <Image size={45} color='#faad20' />
                      <PlayCircle size={45} color='#5f66cd' />
                      <FileText size={45} color='#f33d79' />
                    </div>}
                    {Header.type === "Image" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ minHeight: "170px", background: "#ffddb0" }}>
                      {Header.file instanceof File || Header.file instanceof Blob ? (
                        <img
                          className='img-fluid border-0 rounded-3 w-100 object-fit-cover'
                          style={{ minHeight: "170px" }}
                          src={URL.createObjectURL(Header.file)}
                          alt=""
                        />
                      ) : (
                        Header.file === '' ? (
                          <Image size={45} color='#faad20' />
                        ) : (
                          <img
                            className='img-fluid border-0 rounded-3 w-100 object-fit-cover'
                            style={{ minHeight: "170px" }}
                            src={Header.file}
                            alt=""
                          />
                        )
                      )}
                    </div>}
                    {Header.type === "Video" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#bbc7ff" }}>

                      {
                        Header.file === '' ? <PlayCircle size={45} color='#5f66cd' /> : <video className='rounded-3  object-fit-cover w-100' controls autoPlay mute style={{ height: "170px" }}>
                          <source
                            src={Header.file === '' ? '' : URL.createObjectURL(Header.file)}
                            type="video/mp4"
                          />
                          Video not supported.
                        </video>
                      }
                    </div>}
                    {Header.type === "Document" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffb8cf" }}>
                      <FileText size={45} color='#f33d79' />
                    </div>}
                    {
                      Header.type === "Text" && <h6 className='fs-4 text-black bolder mb-1 '>{Header.text.replace(/\{\{1\}\}/g, Header_Parameters[0]?.value ? `[${Header_Parameters[0]?.value}]` : '{{1}}')}</h6>
                    }
                    {/* body */}
                    <div className='mt-2'>
                      <h5 dangerouslySetInnerHTML={{ __html: displayedMessage }}></h5>
                    </div>
                    {/* footer */}
                    {
                      BasicTemplateData.footer && <h6 className='text-secondary mt-1'>{BasicTemplateData.footer}</h6>
                    }
                  </CardBody>
                  {
                    useInteractive.dataList && useInteractive.dataList.map((elem) => {
                      if (elem.actionType === 'PHONE_NUMBER' && elem.title !== '') {
                        return (
                          <div className="border-top  bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                            <Phone size={17} /><h6 className='m-0 text-primary' > {elem.title}</h6>
                          </div>)
                      }
                      if (elem.actionType === 'URL' && elem.title !== '') {
                        return (
                          <div className="border-top  bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                            <ExternalLink size={17} /><h6 className='m-0 text-primary' > {elem.title}</h6>
                          </div>)
                      }
                    })
                  }
                </Card>
                {/* buttons */}
                {
                  useInteractive.dataList && useInteractive.dataList.map((elem) => {
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

                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' htmlFor='radio1' >
                    <Input type='radio' id='radio1' style={{ marginLeft: '15px' }} name='radio1' value='None' defaultChecked onChange={handleTnteractiveRadio} />
                    <p className="m-0">None</p>
                  </Label>


                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' htmlFor='radio2'  >
                    <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='Call' onChange={handleTnteractiveRadio} />
                    <p className="m-0">Call to Action</p>
                  </Label>

                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' htmlFor='radio3' >
                    <Input type='radio' id='radio3' style={{ marginLeft: '15px' }} name='radio1' value='Quick' onChange={handleTnteractiveRadio} />
                    <p className="m-0">Quick Replies
                    </p>
                  </Label>

                  <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' htmlFor='radio4' >
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
                            <Select options={selectPhoneList}
                              onChange={(e) => handleInputChange(index, 'code', e.value)}
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
                          <div className='cursor-pointer' onClick={() => handleDeleteAction(index)}>X</div>
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
                            <div className='cursor-pointer' onClick={() => handleDeleteAction(index)}>X</div>
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
                                <div className='cursor-pointer' onClick={() => handleDeleteAction(index)}>X</div>
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
                                <div className='cursor-pointer' onClick={() => handleDeleteAction(index)}>X</div>
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
                                <Select options={selectPhoneList}
                                  onChange={(e) => handleInputChange(index, 'code', e.value)}
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
                                <div className='cursor-pointer' onClick={() => handleDeleteAction(index)}>X</div>
                              </Col>
                            </Row>
                          )
                        }
                      })}
                      <div className='d-flex gap-2'>
                        <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center   gap-1 ${useButtons.QUICK_REPLY === 0 ? 'disabled' : ''}`} onClick={() => handleAddAction("QUICK_REPLY")} >
                          <Plus size={18} /> <p className='m-0'>Quick Reply</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.QUICK_REPLY}</p></div>
                        </div>
                        <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center  gap-1 ${(useButtons.URL === 0 || useButtons.QUICK_REPLY === 0) ? 'disabled' : ''}`} onClick={() => handleAddAction("URL")}>
                          <Plus size={18} /> <p className='m-0'>URL</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.URL}</p></div>
                        </div>
                        <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center  gap-1 ${(useButtons.PHONE_NUMBER === 0 || useButtons.QUICK_REPLY === 0) ? 'disabled' : ''}`} onClick={() => handleAddAction("PHONE_NUMBER")}>
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
