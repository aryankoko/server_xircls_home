import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap'
import whatsapp from './imgs/whatsapp.png'
import toast from 'react-hot-toast'
import Select from 'react-select'
import { Download, FileText, Image } from 'react-feather'
import ResizableTextarea from './components/ResizableTextarea'

export default function OtpinManage() {
    // const [rows, setRows] = useState(1)

    const msgTypeData = [
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
        }
    ]
    const [modal, setModal] = useState(false)
    const [optOutTemp_type, setoptOutTemp_type] = useState('Regular')
    const [optOutMsg_type, setoptOutMsg_type] = useState(msgTypeData[0])

    const [useOptOutRespConfig, setOptOutRespConfig] = useState({
        msgBody: 'You have been opted-out of your future communications'
    })
    const toggle = () => setModal(!modal)

    const makeToast = (msg = "success") => {
        toast.success(msg)
    }
    const [inputFields, setInputFields] = useState([{ id: 1, value: 'Stop' }])
    const [inputFields_2, setInputFields_2] = useState([{ id: 1, value: 'Allow' }])

    const addInputField = (num) => {
        if (num === 2) {
            setInputFields_2([...inputFields_2, { id: inputFields_2.length + 1, value: '' }])

        } else {
            setInputFields([...inputFields, { id: inputFields.length + 1, value: '' }])
        }
    }


    const updateState = (key, value) => {
        setOptOutRespConfig(prevState => ({ ...prevState, [key]: value }))
        // if (key === 'msgBody') {
        //     const textareaRows = value.split('\n').length                                                                                 
        //     setRows(textareaRows)
        // }
    }

    const RenderWhatsppUI = () => {
        return (
            <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: "400px", whiteSpace: 'pre-wrap' }} >
                <img src={whatsapp} alt="" width={40} className=' position-absolute  ' style={{ marginTop: "-20px", marginLeft: "-20px", zIndex:'8' }} />
                {
                    optOutMsg_type.value === "Text" &&
                    <CardBody  >
                        <h5>{useOptOutRespConfig?.msgBody}</h5>
                    </CardBody>

                }
                {
                    optOutMsg_type.value === "Image" &&
                    <CardBody className='p-0 ' >
                        <div style={{ height: "200px" }} >

                            {useOptOutRespConfig?.mediaUrl && <img className=' img-fluid border-0 rounded-top-2 w-100 object-fit-cover ' style={{ height: "200px" }} src={useOptOutRespConfig.mediaUrl} alt="" />}
                        </div>
                        <div className='p-1' >

                            <h5 >{useOptOutRespConfig?.caption}</h5>
                        </div>
                    </CardBody>

                }
                {
                    optOutMsg_type.value === "File" &&
                    <CardBody className='position-relative d-flex align-items-center '>
                        <FileText size={25} />
                        <h5 className='m-0 ms-1 '>{useOptOutRespConfig?.file_name ? useOptOutRespConfig.file_name : 'Untitled'}</h5>
                        <Download size={25} className=' position-absolute  end-0 me-2' />
                    </CardBody>

                }
                {
                    optOutMsg_type.value === "Video" &&
                    <CardBody className='p-0 ' >
                        <div style={{ height: "200px" }} >

                            {useOptOutRespConfig?.mediaUrl &&
                                <video className=' object-fit-cover w-100' controls style={{ height: "200px" }}>
                                    <source
                                        src={useOptOutRespConfig?.mediaUrl}
                                        type="video/mp4"
                                    />
                                    Video not supported.
                                </video>
                            }
                        </div>
                        <div className='p-1'>
                            <h5>{useOptOutRespConfig?.caption}</h5>
                        </div>
                    </CardBody>

                }
                {
                    optOutMsg_type.value === "Audio" &&
                    <CardBody className=''>
                        <audio controls>
                            <source src={useOptOutRespConfig?.mediaUrl}
                                type="audio/mpeg" />
                        </audio>
                    </CardBody>

                }
            </Card>
        )
    }
    return (
        <Container>
            <style>
                {`
                @media (min-width: 992px) {

                    .modal-dialog {
                        --bs-modal-width: 1000px;
                    }
                }
                `}
            </style>
            <Card>
                <CardBody>
                    <h4 className="">Opt-in Management</h4>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h4 className="">Quick Guide</h4>
                    <p className="fs-5">Setup keywords that user can type to Opt-in & Opt-out from messaging campaign</p>
                    <div>
                        <Link to="/">How to Create Opt-out/Opt-in User?</Link>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className='d-flex justify-content-between '>
                    <div >
                        <h4 className="">API Campaign Opt-out</h4>
                        <p className="fs-5">Enable this if you don't wish to send api campaign to opted-out contacts</p>
                    </div>
                    <div className='form-check form-switch form-check-success mb-1'>
                        <Input type='checkbox' id='inviteReceived' onChange={() => makeToast("Enable")} />
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col md="6" >
                            <div className="p-2">
                                <h4 className="">Opt-out Keywords</h4>
                                <p className="fs-5">The user will have to type exactly one of these messages
                                    on which they should be automatically opted-out
                                </p>
                                <Row className='d-flex flex-column  gap-1'>
                                    {inputFields.map((field) => (
                                        <Col key={field.id} md="6">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                name={`email_${field.id}`}
                                                defaultValue={field.value}
                                                placeholder='Enter Keywords'
                                            />
                                        </Col>
                                    ))}
                                </Row>

                                <button className='btn text-success mt-3' onClick={addInputField}>+ Add more</button>
                                <button className='btn btn-success text-white mt-3 ms-1' onClick={() => makeToast("opt-out save")}>Save Setting</button>
                            </div>
                        </Col>
                        <Col md="6" >
                            <div className="p-2">
                                <div className='d-flex justify-content-between '>
                                    <div>
                                        <h4 className="">Opt-out Response</h4>
                                        <p className="fs-5">Setup a response message for opt-out user keywords </p>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center '>
                                        <div className='form-check form-switch form-check-success'>
                                            <Input type='checkbox' id='inviteReceived' onChange={() => makeToast("opt-out Enable")} />
                                        </div>
                                        <button className='btn btn-outline-primary ' onClick={toggle}>Configure</button>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center  flex-column  mt-4 '>
                                    <RenderWhatsppUI />
                                    <p >Auto response is disabled</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col md="6" >
                            <div className="p-2">
                                <h4 className="">Opt-in Keywords</h4>
                                <p className="fs-5">The user will have to type exactly one of these messages on which they should be automatically opted-in</p>
                                <Row className='d-flex flex-column  gap-1'>
                                    {inputFields_2.map((field) => (
                                        <Col key={field.id} md="6">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                name={`email_${field.id}`}
                                                defaultValue={field.value}
                                                placeholder='Enter Keywords'
                                            />
                                        </Col>
                                    ))}
                                </Row>

                                <button className='btn text-success mt-3' onClick={() => addInputField(2)}>+ Add more</button>
                                <button className='btn btn-success text-white mt-3 ms-1' onClick={() => makeToast("opt-out save")}>Save Setting</button>
                            </div>
                        </Col>
                        <Col md="6" >
                            <div className="p-2">
                                <div className='d-flex justify-content-between '>
                                    <div>
                                        <h4 className="">Opt-in Response</h4>
                                        <p className="fs-5">Setup a response message for Opt-in user keywords </p>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center '>
                                        <div className='form-check form-switch form-check-success'>
                                            <Input type='checkbox' id='inviteReceived' onChange={() => makeToast("opt-in Enable")} />
                                        </div>
                                        <button className='btn btn-outline-primary '>Configure</button>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center  flex-column  mt-4 '>
                                    <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: "380px" }}>
                                        <img src={whatsapp} alt="" width={40} className=' position-absolute  ' style={{ marginTop: "-20px", marginLeft: "-20px" }} />
                                        <CardBody >

                                            <h5>Thanks, You have been opted-in of your future communications</h5>
                                        </CardBody>
                                    </Card>
                                    <p >Auto response is disabled</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {/* modal 1 */}
            <Modal isOpen={modal} toggle={toggle} scrollable={true} size="lg"  >
                <ModalHeader toggle={toggle} className='mt-2 px-3'>
                    <h4 className="">Configure Message</h4>
                    <p className="fs-5 text-secondary">Send template message from one of your pre approved templates. You can also opt to send regular message to active users.</p>
                </ModalHeader>
                <ModalBody className='px-3 ' style={{ minHeight: "435px" }}>
                    <Row >
                        <Col lg="6" >
                            <div style={{ maxWidth: "380px" }}>

                                <div className='d-flex flex-column gap-1'>
                                    <div className='form-check p-0'>
                                        <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio1' >
                                            <Input type='radio' id='radio1' style={{ marginLeft: '15px' }} name='radio1' value='Pre-approved' checked={optOutTemp_type === 'Pre-approved'} onChange={(e) => setoptOutTemp_type(e.target.value)} />
                                            <p className="m-0">Pre-approved template message</p>
                                        </Label>

                                    </div>
                                    <div className='form-check p-0'>
                                        <Label className=' rounded form-check-label d-flex justify-content-start align-items-center gap-1' for='radio2' >
                                            <Input type='radio' id='radio2' style={{ marginLeft: '15px' }} name='radio1' value='Regular' checked={optOutTemp_type === 'Regular'} onChange={(e) => setoptOutTemp_type(e.target.value)} />
                                            <p className="m-0">Regular Message</p>
                                        </Label>
                                    </div>
                                </div>


                                {/*  type of msg content */}
                                {
                                    // eslint-disable-next-line multiline-ternary
                                    optOutTemp_type === 'Regular' ?
                                        // eslint-disable-next-line multiline-ternary
                                        <div>
                                            <div className='mt-3' >
                                                <h4 className="m-0">Message Type {optOutMsg_type.value}</h4>
                                                <p className="fs-5 m-0 text-secondary">Select one of available message types</p>

                                                <Select
                                                    className='mt-1'
                                                    isMulti={false}
                                                    options={msgTypeData}
                                                    closeMenuOnSelect={true}
                                                    defaultValue={optOutMsg_type}
                                                    name="phone_code"
                                                    onChange={(e) => { setoptOutMsg_type(e); setOptOutRespConfig(null) }}
                                                    styles={{
                                                        control: (baseStyles) => ({
                                                            ...baseStyles,
                                                            fontSize: '12px'
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div className='mt-2'>
                                                {(() => {
                                                    switch (optOutMsg_type.value) {
                                                        case "Text":
                                                            return (
                                                                <div>
                                                                    <h4 className="m-0">Message</h4>
                                                                    <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                    <ResizableTextarea maxLength={4096} placeholder='Opt-out Message' onChange={(e) => updateState('msgBody', e.target.value)} />
                                                                </div>
                                                            )
                                                        case "Image":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Caption</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                        <ResizableTextarea maxLength={4096} initialContent={useOptOutRespConfig?.caption ?? ''} placeholder='Your caption goes here' onChange={(e) => updateState('caption', e.target.value)} />
                                                                        <input
                                                                            type="file"
                                                                            id="imageInput"
                                                                            accept="image/*"
                                                                            onChange={ (e) => console.log(e.target)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt; 5MB, Accepted formats - .png or .jpeg</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.mediaUrl ?? ''}
                                                                        // defaultValue={useOptOutRespConfig?.mediaUrl ? useOptOutRespConfig?.mediaUrl : ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            // defaultValue={useOptOutRespConfig?.file_name ? useOptOutRespConfig?.file_name : ''}
                                                                            value={useOptOutRespConfig?.file_name ?? ''}
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            maxLength={4096}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "File":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt; 100MB, Accepted formats - .pdf, .DOCX & .XLSX</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.mediaUrl ?? ''}

                                                                        // defaultValue={useOptOutRespConfig?.mediaUrl ? useOptOutRespConfig?.mediaUrl : ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.file_name ?? ''}

                                                                        // defaultValue={useOptOutRespConfig?.file_name ? useOptOutRespConfig?.file_name : ''}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "Video":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Caption</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Your message can be up to 4096 characters long.</p>
                                                                        <ResizableTextarea maxLength={4096} initialContent={useOptOutRespConfig?.caption ?? ''} placeholder='Your caption goes here' onChange={(e) => updateState('caption', e.target.value)} />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt;16MB, Accepted formats - .mp4</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                            value={useOptOutRespConfig?.mediaUrl ?? ''}
                                                                        // defaultValue={useOptOutRespConfig?.mediaUrl ? useOptOutRespConfig?.mediaUrl : ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            // defaultValue={useOptOutRespConfig?.file_name ? useOptOutRespConfig.file_name : 'Untitled'}
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            value={useOptOutRespConfig?.file_name ?? ''}
                                                                            maxLength={4096}
                                                                        // defaultValue={useOptOutRespConfig?.file_name ? useOptOutRespConfig?.file_name : ''}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case "Audio":
                                                            return (
                                                                <div className='d-flex flex-column gap-2'>
                                                                    <div>
                                                                        <h4 className="m-0">Media</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Size &lt;16MB, Accepted formats - .mp3</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Opt-out Message'
                                                                            onChange={(e) => updateState('mediaUrl', e.target.value)}
                                                                            maxLength={4096}
                                                                        // defaultValue={useOptOutRespConfig?.mediaUrl ? useOptOutRespConfig?.mediaUrl : ''}
                                                                        />
                                                                        <div className='d-flex align-items-center gap-1 mt-1'>
                                                                            <h5 className='m-0'>OR</h5>
                                                                            <div className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="m-0">File Name</h4>
                                                                        <p className="fs-5 m-0 text-secondary">Display name of media file, visible on download.</p>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-lg"
                                                                            placeholder='Enter Here'
                                                                            onChange={(e) => updateState('file_name', e.target.value)}
                                                                            value={useOptOutRespConfig?.file_name ?? ''}
                                                                            maxLength={4096}
                                                                        // defaultValue={useOptOutRespConfig?.file_name ? useOptOutRespConfig?.file_name : ''}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        default:
                                                            return null
                                                    }
                                                })()}
                                            </div>
                                        </div>

                                        : <div className='mt-3' >
                                            <h4 className="m-0">Template Name {optOutMsg_type.value}</h4>
                                            <p className="fs-5 m-0 text-secondary">Please choose a WhatsApp template message from your approved list</p>

                                            <Select
                                                className='mt-1'
                                                isMulti={false}
                                                options={msgTypeData}
                                                closeMenuOnSelect={true}
                                                defaultValue={msgTypeData[0]}
                                                name="phone_code"
                                                onChange={(e) => { setoptOutMsg_type(e.value); setOptOutRespConfig(null) }}
                                                styles={{
                                                    control: (baseStyles) => ({
                                                        ...baseStyles,
                                                        fontSize: '12px'
                                                    })
                                                }}
                                            />
                                        </div>}


                            </div>
                        </Col>

                        {/* UI output */}
                        <Col lg="6" className='d-flex align-items-center  justify-content-center pt-5 pt-lg-1' >

                            <RenderWhatsppUI />

                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className=''>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
