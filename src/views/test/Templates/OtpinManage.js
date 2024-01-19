import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import whatsapp from './imgs/whatsapp.png'

export default function OtpinManage() {
    return (
        <Container>
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
                        <Input type='checkbox' id='inviteReceived' />
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
                                <input type="text" className="form-control form-control-lg" name="email" />

                                <button className='btn text-success mt-3'>+ Add more</button>
                                <button className='btn btn-success text-white mt-3 ms-1'>Save Setting</button>
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
                                            <Input type='checkbox' id='inviteReceived' />
                                        </div>
                                        <button className='btn btn-outline-primary '>Configure</button>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center  flex-column  mt-4 '>
                                    <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: "350px" }}>
                                        <img src={whatsapp} alt="" width={40} className=' position-absolute  ' style={{ marginTop: "-20px", marginLeft: "-20px" }} />
                                        <CardBody className=''>

                                            <h5>You have been opted-out of your future communications</h5>
                                        </CardBody>
                                    </Card>
                                    <p className=''>Auto response is disabled</p>
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
                                <input type="text" className="form-control form-control-lg" name="email" />

                                <button className='btn text-success mt-3'>+ Add more</button>
                                <button className='btn btn-success text-white mt-3 ms-1'>Save Setting</button>
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
                                            <Input type='checkbox' id='inviteReceived' />
                                        </div>
                                        <button className='btn btn-outline-primary '>Configure</button>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center  flex-column  mt-4 '>
                                    <Card className='rounded-3 shadow-lg  position-relative ' style={{ width: "350px" }}>
                                        <img src={whatsapp} alt="" width={40} className=' position-absolute  ' style={{ marginTop: "-20px", marginLeft: "-20px" }} />
                                        <CardBody className=''>

                                            <h5>Thanks, You have been opted-in of your future communications</h5>
                                        </CardBody>
                                    </Card>
                                    <p className=''>Auto response is disabled</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    )
}
