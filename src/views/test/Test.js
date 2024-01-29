import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import whatsapp from './Templates/imgs/whatsapp.png'

export default function Test() {
  const [parametersList, setParametersList] = useState([])
  const [useMsgBody, setMsgBody] = useState("Use text formatting - *bold* , _italic_ & ~strikethrough~ Your message content. Upto 1024 characters are allowed. e.g. - Hello {{1}}, your code will expire in {{2}} mins.")
  const [displayedMessage, setDisplayedMessage] = useState(useMsgBody)


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

    // add {{n}} by cal 
    // let num
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
    // Update parametersList based on the new message
    updateParametersList(value)
  }
  
    // Effect to update parametersList when useMsgBody changes
    useEffect(() => {
      updateParametersList(useMsgBody)
    }, [useMsgBody])
  
    // Effect to update displayedMessage when parametersList changes
    useEffect(() => {
      updateDisplayedMessage()
    }, [parametersList])
  
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
              {/* Message body input */}
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
            </Col>
            {/* Displayed message card */}
            <Col lg="6" className='d-flex align-items-center justify-content-center '>
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